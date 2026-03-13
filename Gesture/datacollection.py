import cv2
from cvzone.HandTrackingModule import HandDetector
import numpy as np
import math
import time
import os

cap = cv2.VideoCapture(0)
detector = HandDetector(maxHands=2)
offset = 20
imgSize = 300
counter = 0

folder = "Data/Okay"
if not os.path.exists(folder):
    os.makedirs(folder)

while True:
    success, img = cap.read()
    if not success or img is None:
        print("Failed to capture frame from camera.")
        continue

    hands, img = detector.findHands(img)

    if hands:
        for idx, hand in enumerate(hands):
            x, y, w, h = hand['bbox']
            h_img, w_img, _ = img.shape
            x_start = max(x - offset, 0)
            y_start = max(y - offset, 0)
            x_end = min(x + w + offset, w_img)
            y_end = min(y + h + offset, h_img)

            imgCrop = img[y_start:y_end, x_start:x_end]

            if imgCrop.size == 0:
                print("Empty crop, skipping hand.")
                continue

            aspectRatio = (y_end - y_start) / (x_end - x_start)
            imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255

            if aspectRatio > 1:
                k = imgSize / (y_end - y_start)
                wCal = math.ceil(k * (x_end - x_start))
                imgResize = cv2.resize(imgCrop, (wCal, imgSize))
                wGap = math.ceil((imgSize - wCal) / 2)
                imgWhite[:, wGap:wGap + wCal] = imgResize
            else:
                k = imgSize / (x_end - x_start)
                hCal = math.ceil(k * (y_end - y_start))
                imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                hGap = math.ceil((imgSize - hCal) / 2)
                imgWhite[hGap:hGap + hCal, :] = imgResize

            cv2.imshow(f'ImageCrop{idx+1}', imgCrop)
            cv2.imshow(f'ImageWhite{idx+1}', imgWhite)

            key = cv2.waitKey(1)
            if key == ord("1"):
                counter += 1
                filename = f'{folder}/Image_{counter}_Hand{idx+1}_{int(time.time())}.jpg'
                cv2.imwrite(filename, imgWhite)
                print(f"Saved image {counter}: {filename}")

    cv2.imshow('Image', img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()