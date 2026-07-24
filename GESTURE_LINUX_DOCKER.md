# Linux webcam deployment

To deploy the web application and the webcam gesture service on a Linux host
that exposes the camera as `/dev/video0`, run:

```bash
docker compose -f compose.yml -f compose.gesture.linux.yml up --build -d
```

The web app is available at port 8080 and the gesture API at port 5000. The
camera is intentionally mapped only in this Linux-specific configuration.
