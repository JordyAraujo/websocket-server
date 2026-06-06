import { WebSocketServer } from 'ws'
import { createSession, sessions } from './sessions'
import { debugClients, debugControllers, debugMessage } from './debuggers'
import { createInputMessage, isInputMessage } from './messages/input'
import { createPlayerJoinedMessage, createSessionCreatedMessage, isCreateSessionMessage, isJoinSessionMessage } from './messages/session'
import { createErrorMessage } from './messages/error'
import { clients, setClient } from './clients'

const wss = new WebSocketServer({
    port: 3001
})

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message.toString())
        debugMessage(data, false, clients.get(ws)?.clientId || null)

        if (isCreateSessionMessage(data)) {
            const session = createSession(ws)
            setClient(ws, 'tv', session.id, session.id)
            const message = createSessionCreatedMessage(session.id)
            ws.send(
                JSON.stringify(message)
            )
            debugMessage(message)
            debugClients()
            return
        }

        if (isJoinSessionMessage(data)) {
            const session = sessions.get(data.payload.sessionId)

            if (!session || !session.tv) return

            if (session.controllers.length >= 4) {
                ws.send(
                    JSON.stringify(createErrorMessage('Session is full'))
                )
                return
            }

            setClient(ws, 'controller', data.payload.sessionId, data.payload.clientId, data.payload.playerName)

            const message = createPlayerJoinedMessage(session.controllers)

            clients.forEach((client) => {
                client.socket.send(
                    JSON.stringify(message)
                )
            })

            debugMessage(message)
            debugControllers(session.controllers)
            return
        }

        if (isInputMessage(data)) {
            const client = clients.get(ws)

            if (!client || !client.sessionId) return

            const session = sessions.get(client.sessionId)

            if (!session || !session.tv) return

            const message = createInputMessage(data.payload.button)

            session.tv.send(
                JSON.stringify(message)
            )
            debugMessage(message)
            return
        }
    })
})

console.log('websocket server running on :3001')