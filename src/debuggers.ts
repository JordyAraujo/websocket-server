import { clients } from "./clients"
import { Controller } from "./sessions"

export function debugControllers(controllers: Map<string, Controller>) {
  console.log('--- CONTROLLERS ---')
  controllers.forEach((controller) => {
    console.log({
      clientId: controller.clientId,
      playerName: controller.playerName,
      color: controller.color
    })
  })

  console.log('---------------')
}

export function debugClients() {
  console.log('--- CLIENTS ---')
  clients.forEach((client) => {
    console.log({
      sessionId: client.sessionId,
      clientId: client.clientId,
      type: client.type,
    })
  })
  console.log('---------------')
}

export function debugMessage(message: any, clientId: string | null = null, sent: boolean = true) {
  console.log(`--- MESSAGE ${sent ? `SENT TO` : `RECEIVED FROM`} ${clientId} ---`)
  console.log({ message })
  console.log('---------------')
}