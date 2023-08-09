# Atmocube-metrics

A Node.js server that exposes metrics of the Atomocube.

## For Developers

### Getting Started

```sh
export MODBUS_TCP_IP=<Your device IP>
export MODBUS_TCP_PORT=<Your device Port>
export SERVER_PORT=<Server Port>

npm run build
node ./dist/index.js
```

### APIs

- `GET /metrics`: An API that returns metrics as Prometheus format.
- `GET /info`: An API that returns metrics as JSON format.

### Build

```sh
docker login
docker buildx create --use
docker buildx build --platform=linux/arm/v7,linux/arm64,linux/amd64 -t wokim/atmocube-metrics:latest --target release --push .
docker buildx build --platform=linux/arm/v7,linux/arm64,linux/amd64 -t wokim/atmocube-metrics:0.0.1 --target release --push .
```
