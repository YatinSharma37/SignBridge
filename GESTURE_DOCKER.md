# Gesture service with Docker

The main app runs with `docker compose up --build -d`.

The Live Gesture Camera uses a Python service and a physical webcam. On a
Linux host where the webcam is `/dev/video0`, start it alongside the web app:

```bash
docker compose -f compose.yml -f compose.gesture.yml up --build -d
```

The API is available on port 5000 and is already the address used by the Live
Gesture Camera page. Docker Desktop on Windows and macOS does not generally
expose host webcams to Linux containers; in that case, run `Gesture/test.py`
directly on the machine with the camera.
