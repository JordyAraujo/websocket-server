import { WebSocketServer } from 'ws'
import { createSession, sessions } from './sessions'
import { clients, setClient } from './clients'
import { debugClients } from './debuggers'
import { createInputMessage, isInputMessage } from './messages/input'
import { createJoinedSessionMessage, createPlayerJoinedMessage, createSessionCreatedMessage, isCreateSessionMessage, isJoinSessionMessage, isPlayerJoinedMessage } from './messages/session'

const wss = new WebSocketServer({
    port: 3001
})

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message.toString())

        if (isInputMessage(data)) {
            const client = clients.get(ws)

            if (!client || !client.sessionId) return

            const session = sessions.get(client.sessionId)

            if (!session || !session.tv) return

            session.tv.send(
                JSON.stringify(createInputMessage(data.payload.button))
            )
            return
        }

        if (isJoinSessionMessage(data)) {
            const session = sessions.get(data.payload.sessionId)

            if (!session || !session.tv) return

            setClient(ws, 'controller', data.payload.sessionId, data.payload.clientId)
            session.tv.send(
                JSON.stringify(createJoinedSessionMessage(data.payload.sessionId, data.payload.clientId))
            )
            ws.send(
                JSON.stringify(createPlayerJoinedMessage(data.payload.sessionId, data.payload.clientId))
            )

            debugClients()
            return
        }

        if (isCreateSessionMessage(data)) {
            const sessionId = createSession(ws)
            setClient(ws, 'tv', sessionId, sessionId)
            ws.send(
                JSON.stringify(createSessionCreatedMessage(sessionId))
            )

            debugClients()
            return
        }
    })
})

console.log('websocket server running on :3001')