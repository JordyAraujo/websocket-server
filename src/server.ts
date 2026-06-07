import { WebSocketServer } from "ws"
import { debugClients, debugControllers, debugMessage } from "./debuggers"
import { clients, setClient } from "./clients"
import { createErrorMessage } from "./messages/utils/error"
import { isCreateSessionMessage, createSessionCreatedMessage, isJoinSessionMessage, createPlayerJoinedMessage, isPlayerColorMessage, createPlayersUpdatedMessage } from "./messages/utils/session"
import { ControllerData, createSession, sessions } from "./sessions"

const MAX_PLAYERS_PER_SESSION = 4

const wss = new WebSocketServer({
    port: 3001
})

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message.toString())
        debugMessage(data, clients.get(ws)?.clientId || null, false)

        if (isCreateSessionMessage(data)) {
            const session = createSession(ws)
            const client = setClient(ws, 'tv', session.id, session.id)
            const message = createSessionCreatedMessage(session.id)
            ws.send(
                JSON.stringify(message)
            )
            debugMessage(message, client?.clientId)
            debugClients()
            return
        }

        if (isJoinSessionMessage(data)) {
            const session = sessions.get(data.payload.sessionId)

            if (!session || !session.tv) return

            if (session.controllers.size >= MAX_PLAYERS_PER_SESSION) {
                ws.send(
                    JSON.stringify(createErrorMessage('Session is full'))
                )
                return
            }

            setClient(ws, 'controller', data.payload.sessionId, data.payload.clientId, data.payload.playerName)

            const message = createPlayerJoinedMessage({
                clientId: data.payload.clientId,
                playerName: data.payload.playerName
            })

            session.tv.send(
                JSON.stringify(message)
            )

            debugMessage(message, session.id)
            debugControllers(session.controllers)
            return
        }

        if (isPlayerColorMessage(data)) {
            const session = sessions.get(data.payload.sessionId)

            if (!session || !session.tv) return

            const updatedPlayer = session.controllers.get(data.payload.clientId)
            if (updatedPlayer) {
                updatedPlayer.color = data.payload.color
            }

            const message = createPlayersUpdatedMessage(Array.from(session.controllers.values()).map(c => ({
                clientId: c.clientId,
                playerName: c.playerName,
                color: c.color
            })));

            session.controllers.forEach((controller) => {
                controller.socket.send(
                    JSON.stringify(message)
                )
                debugMessage(message, controller.clientId)
            })

            debugControllers(session.controllers)
            return
        }
    })
})

console.log('websocket server running on :3001')