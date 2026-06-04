import { WebSocketServer } from 'ws'
import { createSession, sessions } from './sessions'
import { clients, setClient } from './clients'
import { debugClients, debugMessage } from './debuggers'
import { createInputMessage, isInputMessage } from './messages/input'
import { createJoinedSessionMessage, createSessionCreatedMessage, isCreateSessionMessage, isJoinSessionMessage } from './messages/session'
import { createErrorMessage } from './messages/error'

const wss = new WebSocketServer({
    port: 3001
})

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message.toString())
        debugMessage(data, false, clients.get(ws)?.clientId || null)

        if (isCreateSessionMessage(data)) {
            const sessionId = createSession(ws)
            setClient(ws, 'tv', sessionId, sessionId)
            const message = createSessionCreatedMessage(sessionId)
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

            session.controllers.push(ws)

            setClient(ws, 'controller', data.payload.sessionId, data.payload.clientId)
            let message = createJoinedSessionMessage(data.payload.sessionId, data.payload.clientId)
            session.tv.send(
                JSON.stringify(message)
            )
            debugMessage(message)
            message = createJoinedSessionMessage(data.payload.sessionId, data.payload.clientId)
            ws.send(
                JSON.stringify(message)
            )
            debugMessage(message)

            debugClients()
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