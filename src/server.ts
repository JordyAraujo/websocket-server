import { WebSocketServer } from 'ws'
import { generateSessionId, sessions } from './sessions'
import { clients } from './clients'
import { debugClients } from './debuggers'
import { isInputMessage } from './messages/input'
import { isCreateSessionMessage, isJoinSessionMessage } from './messages/session'

const wss = new WebSocketServer({
    port: 3001
})

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message.toString())
        console.log(data)

        if (isInputMessage(data)) {
            const client = clients.get(ws)

            if (!client || !client.sessionId) return

            const session = sessions.get(client.sessionId)

            if (!session || !session.tv) return

            session.tv.send(
                JSON.stringify({
                    type: 'input',
                    payload: data.payload
                })
            )
            return
        }

        if (isJoinSessionMessage(data)) {
            const session = sessions.get(data.payload.sessionId)

            if (!session || !session.tv) return

            clients.set(ws, {
                socket: ws,
                type: 'controller',
                sessionId: data.payload.sessionId
            })

            debugClients()
            return
        }

        if (isCreateSessionMessage(data)) {
            const sessionId = generateSessionId()

            sessions.set(sessionId, {
                id: sessionId,
                tv: ws,
                controllers: []
            })

            clients.set(ws, {
                socket: ws,
                type: 'tv',
                sessionId
            })

            ws.send(
                JSON.stringify({
                    type: 'session_created',
                    payload: {
                        sessionId
                    }
                })
            )
            debugClients()
            return
        }
    })
})

console.log('websocket server running on :3001')