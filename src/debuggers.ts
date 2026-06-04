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

export function debugMessage(message: any, sent: boolean = true, clientId: string|null = null) {
  console.log(`--- MESSAGE ${sent ? 'SENT' : `RECEIVED FROM ${clientId}`} ---`)
  console.log({ message })
  console.log('---------------')
}