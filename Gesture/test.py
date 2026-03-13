from flask import Flask, render_template, Response, jsonify, request
import cv2
from cvzone.HandTrackingModule import HandDetector
import tensorflow as tf
import numpy as np
import math
import time
import threading

app = Flask(__name__)

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

detector = HandDetector(maxHands=2)
model = tf.keras.models.load_model("Model\keras_model.h5")

with open("Model\labels.txt", "r", encoding="utf-8") as f:
    labels = [line.strip().split(' ', 1)[-1] for line in f.readlines()]

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

def prediction_thread():
    global recognized_text, last_labels, label_counters, latest_frame, output_frame
    while True:
        if latest_frame is None:
            time.sleep(0.01)
            continue
        img = latest_frame.copy()
        hands, _ = detector.findHands(img, draw=False)
        imgOutput = img.copy()
        for i, hand in enumerate(hands):
            x, y, w, h = hand['bbox']
            imgCrop, x1, y1, x2, y2 = safe_crop(img, x, y, w, h, offset)
            imgInput = preprocess_hand(imgCrop, w, h)
            prediction = model.predict(imgInput)
            index = np.argmax(prediction)
            label = labels[index]
            with lock:
                if label == last_labels[i]:
                    label_counters[i] += 1
                else:
                    last_labels[i] = label
                    label_counters[i] = 1
                if label_counters[i] == label_threshold:
                    if len(recognized_text) > 1000:
                        recognized_text = recognized_text[-900:]
                    recognized_text += label + " "
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
    app.run(debug=True)
