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
    if (!session || !session.tv) return

    session.controllers.set(clientId, {
      socket: socket,
      clientId: clientId,
      playerName: playerName
    })
  }
  const client = {
    socket,
    type,
    sessionId,
    clientId
  }
  clients.set(socket, client)
  return client
}