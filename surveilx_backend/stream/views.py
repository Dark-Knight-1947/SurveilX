from django.shortcuts import render

# Create your views here.
# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import face_recognition
import numpy as np
from PIL import Image
import io

# Load your known faces once
known_image = face_recognition.load_image_file("path/to/your_known_face.jpg")
known_encoding = face_recognition.face_encodings(known_image)[0]

@csrf_exempt
def recognize(request):
    if request.method == "POST":
        image_file = request.FILES.get("image")
        if not image_file:
            return JsonResponse({"error": "No image provided"}, status=400)

        img = Image.open(image_file)
        img_np = np.array(img)

        face_locations = face_recognition.face_locations(img_np)
        face_encodings = face_recognition.face_encodings(img_np, face_locations)

        for encoding in face_encodings:
            match = face_recognition.compare_faces([known_encoding], encoding)[0]
            if match:
                return JsonResponse({"recognized": True, "name": "John Doe"})

        return JsonResponse({"recognized": False})

    return JsonResponse({"error": "Invalid method"}, status=405)
