import cv2
import face_recognition
import mysql.connector
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import threading

# === Email Configuration ===
EMAIL_ADDRESS = 'bhavya.17420@sakec.ac.in'
EMAIL_PASSWORD = 'chxr zghk jdhl ybsi'
ALERT_RECEIVER = 'receiver_email@example.com'

def send_alert_email(name, timestamp):
    """Send an email alert when a criminal is detected."""
    subject = 'Criminal Detected!'
    body = f'Criminal {name} was detected at {timestamp}.'

    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = ALERT_RECEIVER
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(EMAIL_ADDRESS, ALERT_RECEIVER, text)
        server.quit()
        print(f"[ALERT] Email sent for {name}")
    except Exception as e:
        print(f"[ERROR] Failed to send email: {e}")

def recognize_and_alert():
    """Main function to recognize faces and send alerts."""
    print("[INFO] Loading known faces from database...")

    # === Connect to Database ===
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Bhavya@sakec_17420",
        database="ai_surveillance"
    )
    cursor = db.cursor()

    cursor.execute("SELECT name, encoding FROM criminals")
    criminals = cursor.fetchall()

    known_face_encodings = []
    known_face_names = []

    for name, encoding_str in criminals:
        encoding = list(map(float, encoding_str.split(',')))
        known_face_encodings.append(encoding)
        known_face_names.append(name)

    # === Start Video Stream ===
    print("[INFO] Starting camera stream...")
    cap = cv2.VideoCapture(0)

    sent_alerts = set()

    while True:
        ret, frame = cap.read()
        if not ret:
            print("[ERROR] Failed to read from camera.")
            break

        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)

        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"

            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = face_distances.argmin() if len(face_distances) > 0 else -1

            if best_match_index != -1 and matches[best_match_index]:
                name = known_face_names[best_match_index]

                if name not in sent_alerts:
                    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                    # Insert alert into database
                    cursor.execute(
                        "INSERT INTO alerts (criminal_name, timestamp) VALUES (%s, %s)",
                        (name, timestamp)
                    )
                    db.commit()

                    send_alert_email(name, timestamp)
                    sent_alerts.add(name)

        # Optional: Break with 'q' key
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    cursor.close()
    db.close()
    print("[INFO] Camera stopped.")
