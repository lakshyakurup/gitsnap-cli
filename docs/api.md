# API

Start the local Express API with `npm start`. It listens on port `4000` by default; set `PORT` to use another port.

| Method | Endpoint | Behavior |
| --- | --- | --- |
| `GET` | `/health` | Returns service health JSON. |
| `GET` | `/api/snapshots` | Returns all records from `snapshots.json`. |
| `POST` | `/api/snapshots` | Appends the JSON request body, adds an `id` and `generatedAt`, and returns status `201`. |

The CLI uploads to `POST <api-url>/snapshots`, where the default API base URL is `http://localhost:4000/api`. For example:

```bash
gitsnap --upload --api-url http://localhost:4000/api
```

The server uses a local JSON file and does not authenticate, validate, or sanitize direct API requests. Do not expose it to untrusted networks. Full examples and security notes are in the [README](../README.md#backend-api).
