import { WebSocket } from 'ws'

export type ClientType =
  | 'tv'
  | 'controller'

export interface Client {
  socket: WebSocket
  type: ClientType
  sessionId?: string
}

export const clients =
  new Map<WebSocket, Client>()