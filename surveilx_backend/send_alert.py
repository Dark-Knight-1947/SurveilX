import smtplib
import ssl
from email.message import EmailMessage

# Email credentials
EMAIL_SENDER = "bhavya.17420@sakec.ac.in"
EMAIL_PASSWORD = "chxr zghk jdhl ybsi"  # Use the App Password you generated
EMAIL_RECEIVER = "bhavyapro@gmail.com"  # You as the police headquarters

def send_email_alert(criminal_name, image_path):
    subject = f"🚨 Criminal Detected: {criminal_name} 🚨"
    body = f"A known criminal ({criminal_name}) has been detected. Please check the attached image for verification."

    msg = EmailMessage()
    msg["From"] = EMAIL_SENDER
    msg["To"] = EMAIL_RECEIVER
    msg["Subject"] = subject
    msg.set_content(body)

    # Attach the image
    with open(image_path, "rb") as img_file:
        msg.add_attachment(img_file.read(), maintype="image", subtype="jpeg", filename="criminal_detected.jpg")

    # Send the email
    try:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.send_message(msg)
        print(f" Alert sent successfully to {EMAIL_RECEIVER}")
    except Exception as e:
        print(f" Error sending email: {e}")
