import asyncio
import json
import logging
from datetime import datetime, timezone
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.websocket.manager import ws_manager

logger = logging.getLogger("jalsuraksha.websocket_routes")
router = APIRouter(tags=["Real-Time Streaming"])


@router.websocket("/ws/stream")
async def websocket_stream(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        # Send initial connection handshake
        await websocket.send_text(json.dumps({
            "type": "CONNECTION_ESTABLISHED",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "connected",
            "message": "JalSuraksha Real-Time Telemetry Stream Active"
        }))

        while True:
            # Wait for client messages or keep connection alive
            try:
                data = await asyncio.wait_for(websocket.receive_text(), timeout=15.0)
                # Echo back / acknowledge client ping
                await websocket.send_text(json.dumps({
                    "type": "PONG",
                    "client_message": data,
                    "timestamp": datetime.now(timezone.utc).isoformat()
                }))
            except asyncio.TimeoutError:
                # Send periodic heartbeat with latest telemetry sample
                await websocket.send_text(json.dumps({
                    "type": "HEARTBEAT",
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "telemetry_tick": {
                        "station_id": "GW-014",
                        "depth_m": 32.4,
                        "flow_rate_lpm": 1240,
                        "rain_rate_mm": 4.2
                    }
                }))
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
    except Exception as e:
        logger.warning(f"WebSocket exception: {e}")
        ws_manager.disconnect(websocket)


@router.post("/broadcast")
async def trigger_broadcast(payload: dict):
    await ws_manager.broadcast(payload)
    return {"status": "broadcasted", "recipients": len(ws_manager.active_connections)}
