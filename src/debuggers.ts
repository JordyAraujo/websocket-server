import { clients } from "./clients"
import { Controller } from "./sessions"

export function debugControllers(controllers: Controller[]) {
  console.log('--- CONTROLLERS ---')

  for (const controller of controllers) {
    console.log({
      clientId: controller.clientId,
      playerName: controller.playerName,
      color: controller.color
    })
  }

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

export function debugMessage(message: any, sent: boolean = true, clientId: string|null = null) {
  console.log(`--- MESSAGE ${sent ? 'SENT' : `RECEIVED FROM ${clientId}`} ---`)
  console.log({ message })
  console.log('---------------')
}