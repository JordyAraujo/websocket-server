import { WebSocket } from 'ws'

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

export function setClient(socket: WebSocket, type: ClientType, sessionId: string, clientId: string) {
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