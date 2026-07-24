# Docker deployment

Build and start the production web application:

```bash
docker compose up --build -d
```

Visit `http://localhost:8080`. To stop the service, run:

```bash
docker compose down
```

The image builds the Vite/React application and serves it with Nginx. The
standalone translator and fingerspelling pages linked by the dashboard are
included in the image as well.

The Live Gesture Camera feature uses `Gesture/test.py` and requires direct
access to a physical webcam. It is not included in this static web container;
run that Python service on the machine that owns the camera at port 5000 when
using the feature.
