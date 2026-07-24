from flask import Flask, render_template, Response, jsonify, request
from flask_cors import CORS
import cv2
from cvzone.HandTrackingModule import HandDetector
import numpy as np
import math
import time
import threading

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

detector = HandDetector(maxHands=2)

# Load labels
with open("Model\\labels.txt", "r", encoding="utf-8") as f:
    labels = [line.strip().split(' ', 1)[-1] for line in f.readlines() if line.strip()]

# ── Load model (try keras/tensorflow, fall back gracefully) ───────────
model = None
try:
    import tensorflow as tf
    model = tf.keras.models.load_model("Model\\keras_model.h5")
    print("[INFO] TensorFlow model loaded successfully.")
except Exception as e:
    print(f"[WARN] Could not load TensorFlow model: {e}")
    try:
        import onnxruntime as ort
        model = ort.InferenceSession("Model\\keras_model.onnx")
        print("[INFO] ONNX model loaded as fallback.")
    except Exception as e2:
        print(f"[WARN] Could not load ONNX model either: {e2}")
        # Will use rule-based finger counting as last resort
        print("[INFO] Using rule-based gesture classification (no ML model).")

offset = 20
imgSize = 300
color = (255, 122, 1)

lock = threading.Lock()
recognized_text = ""
last_labels = ["", ""]
label_counters = [0, 0]
label_threshold = 5

latest_frame = None
output_frame = None


def safe_crop(img, x, y, w, h, offset):
    h_img, w_img = img.shape[:2]
    x1 = max(x - offset, 0)
    y1 = max(y - offset, 0)
    x2 = min(x + w + offset, w_img)
    y2 = min(y + h + offset, h_img)
    return img[y1:y2, x1:x2], x1, y1, x2, y2


def preprocess_hand(imgCrop, w, h):
    imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
    aspectRatio = h / w if w != 0 else 1
    if aspectRatio > 1:
        k = imgSize / h
        wCal = math.ceil(k * w)
        imgResize = cv2.resize(imgCrop, (wCal, imgSize), interpolation=cv2.INTER_AREA)
        wGap = math.ceil((imgSize - wCal) / 2)
        imgWhite[:, wGap:wGap + wCal] = imgResize
    else:
        k = imgSize / w
        hCal = math.ceil(k * h)
        imgResize = cv2.resize(imgCrop, (imgSize, hCal), interpolation=cv2.INTER_AREA)
        hGap = math.ceil((imgSize - hCal) / 2)
        imgWhite[hGap:hGap + hCal, :] = imgResize
    imgInput = cv2.resize(imgWhite, (224, 224))
    imgInput = imgInput.astype(np.float32) / 255.0
    imgInput = np.expand_dims(imgInput, axis=0)
    return imgInput


def predict_with_model(imgInput):
    """Run the ML model (TF or ONNX) and return predicted label index."""
    try:
        import tensorflow as tf
        if isinstance(model, tf.keras.Model):
            prediction = model.predict(imgInput, verbose=0)
            return int(np.argmax(prediction))
    except Exception:
        pass
    try:
        import onnxruntime as ort
        if isinstance(model, ort.InferenceSession):
            input_name = model.get_inputs()[0].name
            prediction = model.run(None, {input_name: imgInput})
            return int(np.argmax(prediction[0]))
    except Exception:
        pass
    return -1


def rule_based_classify(hand):
    """Fallback: rough rule-based classification using finger count."""
    fingers = detector.fingersUp(hand)
    total = sum(fingers)
    # Very rough mapping to our 7 labels:
    # Hello=5 fingers, I love you=3(thumb+index+pinky), No=0,
    # Okay=~2, Please=~1, Thank you=~4, Yes=~1 (fist+nod)
    if total == 5:
        return labels.index("Hello") if "Hello" in labels else 0
    elif total == 0:
        return labels.index("No") if "No" in labels else 2
    elif total == 4:
        return labels.index("Thank you") if "Thank you" in labels else 5
    elif total == 3:
        return labels.index("I love you") if "I love you" in labels else 1
    elif total == 2:
        return labels.index("Okay") if "Okay" in labels else 3
    elif total == 1:
        return labels.index("Yes") if "Yes" in labels else 6
    else:
        return labels.index("Please") if "Please" in labels else 4


def prediction_thread():
    global recognized_text, last_labels, label_counters, latest_frame, output_frame
    while True:
        if latest_frame is None:
            time.sleep(0.01)
            continue
        img = latest_frame.copy()
        hands, _ = detector.findHands(img, draw=False)
        imgOutput = img.copy()
        for i, hand in enumerate(hands[:2]):
            x, y, w, h = hand['bbox']
            imgCrop, x1, y1, x2, y2 = safe_crop(img, x, y, w, h, offset)
            if imgCrop.size == 0:
                continue

            # Predict
            if model is not None:
                imgInput = preprocess_hand(imgCrop, w, h)
                index = predict_with_model(imgInput)
                if index < 0:
                    index = rule_based_classify(hand)
            else:
                index = rule_based_classify(hand)

            index = max(0, min(index, len(labels) - 1))
            label = labels[index]

            with lock:
                if i >= len(last_labels):
                    last_labels.append("")
                    label_counters.append(0)
                if label == last_labels[i]:
                    label_counters[i] += 1
                else:
                    last_labels[i] = label
                    label_counters[i] = 1
                if label_counters[i] == label_threshold:
                    if len(recognized_text) > 1000:
                        recognized_text = recognized_text[-900:]
                    recognized_text += label + " "

            # Draw on frame
            cv2.rectangle(imgOutput, (x1, y1 - 70), (x1 + 400, y1 - 10), color, cv2.FILLED)
            cv2.putText(imgOutput, label, (x, y - 30), cv2.FONT_HERSHEY_COMPLEX, 2, (0, 0, 0), 2)
            cv2.rectangle(imgOutput, (x1, y1), (x2, y2), color, 4)

        with lock:
            output_frame = imgOutput
        time.sleep(0.02)


def generate_frames():
    global output_frame, latest_frame
    prev_time = 0
    while True:
        success, frame = cap.read()
        if not success:
            time.sleep(0.1)
            continue
        latest_frame = frame.copy()
        with lock:
            imgOutput = output_frame.copy() if output_frame is not None else frame.copy()
        curr_time = time.time()
        fps = 1 / (curr_time - prev_time + 1e-5)
        prev_time = curr_time
        cv2.putText(imgOutput, f'FPS: {int(fps)}', (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
        ret, buffer = cv2.imencode('.jpg', imgOutput)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')


@app.route('/')
def index():
    return render_template('handgesture.html')


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/recognized_text')
def recognized_text_api():
    with lock:
        current_text = recognized_text.strip()
    return jsonify({'text': current_text})


@app.route('/reset_text', methods=['POST'])
def reset_text():
    global recognized_text, last_labels, label_counters
    with lock:
        recognized_text = ""
        last_labels = ["", ""]
        label_counters = [0, 0]
    return jsonify({'status': 'reset successful'})


if __name__ == '__main__':
    threading.Thread(target=prediction_thread, daemon=True).start()
    app.run(debug=False, host='0.0.0.0', port=5000)
