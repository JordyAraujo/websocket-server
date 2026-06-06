import { WebSocket } from 'ws'
import { sessions } from './sessions'

export type ClientType =
  | 'tv'
  | 'controller'

export interface Client {
  socket: WebSocket
  type: ClientType
  sessionId: string
  clientId: string
}

export const clients =
  new Map<WebSocket, Client>()

export function setClient(socket: WebSocket, type: ClientType, sessionId: string, clientId: string, playerName: string = '') {
  if (type === 'controller') {
    const session = sessions.get(sessionId)
    if (session) {
      session.controllers.push({
        socket: socket,
        clientId: clientId,
        playerName: playerName
      })
    }
  }
  clients.set(socket, {
    socket,
    type,
    sessionId,
    clientId
  })
}

export function getClientById(clientId: string): Client | undefined {
  return Array
    .from(clients.values())
    .find(client => client.clientId === clientId)
}