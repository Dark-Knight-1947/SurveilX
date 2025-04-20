import { useEffect, useRef } from "react";

const FaceCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    // Call your backend when the component loads
    console.log("triggering face detection")
    fetch("http://localhost:5000/detect-face", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // or whatever your backend expects
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Detection result:", data);
      })
      .catch((err) => {
        console.error("Detection error:", err);
      });
  }, []);
  return (
    <>
      <video ref={videoRef} autoPlay width="320" height="240" />
      <canvas
        ref={canvasRef}
        width="320"
        height="240"
        style={{ display: "none" }}
      />
    </>
  );
};

export default FaceCapture;
