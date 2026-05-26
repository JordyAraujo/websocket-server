import { clients } from './clients'

export function debugClients() {
  console.log('--- CLIENTS ---')

  for (const [, client] of clients) {
    console.log({
      type: client.type,
      sessionId: client.sessionId,
      clientId: client.clientId
    })
  }

  console.log('---------------')
}