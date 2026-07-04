import { WebSocket } from 'ws'
import { Session, sessions } from './sessions'
import { createErrorMessage } from './messages/utils/error'

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

export function setClient(socket: WebSocket, type: ClientType, session: Session, clientId: string, playerName: string = ''): Client {
  if (type === 'controller') {
    session.controllers.set(clientId, {
      socket: socket,
      clientId: clientId,
      playerName: playerName
    })
  }

  const client = {
    socket,
    type,
    sessionId: session.id,
    clientId
  }

  clients.set(socket, client)
  
  return client
}