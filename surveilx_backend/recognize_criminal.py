import os
import cv2
import pickle
import face_recognition
import mysql.connector
import numpy as np
import send_alert
import time

# Database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Bhavya@sakec_17420",
    database="ai_surveillance"
)
cursor = db.cursor()

# Path to images
CRIMINALS_PATH = r"C:\Users\Cinepix\Downloads\AI based Surveillance System\surveilx_backend\Missing People"

# Step 1: Add new images to the database
for person_name in os.listdir(CRIMINALS_PATH):
    person_folder = os.path.join(CRIMINALS_PATH, person_name)
    if os.path.isdir(person_folder):
        for image_name in os.listdir(person_folder):
            image_path = os.path.join(person_folder, image_name)
            cursor.execute("SELECT COUNT(*) FROM criminal_faces WHERE name = %s AND image_path = %s", (person_name, image_path))
            if cursor.fetchone()[0] == 0:
                cursor.execute("INSERT INTO criminal_faces (name, image_path, encoding) VALUES (%s, %s, %s)", (person_name, image_path, None))
                db.commit()
                print(f"Added {image_name} for {person_name} to the database.")

# Step 2: Encode images without encodings
cursor.execute("SELECT id, image_path FROM criminal_faces WHERE encoding IS NULL")
images = cursor.fetchall()
known_face_encodings = []
known_face_names = []
if images:
    for img_id, img_path in images:
        if os.path.exists(img_path):
            image = face_recognition.load_image_file(img_path)
            encodings = face_recognition.face_encodings(image)
            if encodings:
                encoding_blob = pickle.dumps(encodings[0])
                cursor.execute("UPDATE criminal_faces SET encoding = %s WHERE id = %s", (encoding_blob, img_id))
                db.commit()
                print(f"Stored encoding for {img_path}")

# Step 3: Load all stored encodings
cursor.execute("SELECT name, encoding FROM criminal_faces WHERE encoding IS NOT NULL")
all_faces = cursor.fetchall()
for name, encoding in all_faces:
    known_face_encodings.append(pickle.loads(encoding))
    known_face_names.append(name)

cursor.close()
db.close()

# Alert cooldown settings
ALERT_COOLDOWN = 300  # 5 minutes
detected_criminals = {}  # Store last detected time for criminals

# Step 4: Run Face Recognition System
cap = cv2.VideoCapture(1, cv2.CAP_DSHOW)  # Change '0' to '1' if external camera is preferred
if not cap.isOpened():
    print("Error: Cannot access webcam. Trying external camera...")
    cap = cv2.VideoCapture(1)
cv2.namedWindow("Criminal Recognition", cv2.WINDOW_NORMAL)
cv2.resizeWindow("Criminal Recognition", 410, 230) 

while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: Couldn't read from camera.")
        break

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        name = "Unknown"
        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = np.argmin(face_distances)

        if matches[best_match_index]:
            name = known_face_names[best_match_index]

            # Check cooldown
            current_time = time.time()
            if name not in detected_criminals or (current_time - detected_criminals[name]) > ALERT_COOLDOWN:
                alert_image_path = f"alert_{name}.jpg"
                cv2.imwrite(alert_image_path, frame)
                send_alert.send_email_alert(name, alert_image_path)
                detected_criminals[name] = current_time  # Update timestamp
                print(f"ALERT! Criminal Detected: {name}")

        color = (0, 0, 255) if name != "Unknown" else (0, 255, 0)
        cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
        cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

    cv2.imshow("Criminal Recognition", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
