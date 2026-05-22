import { WebSocket } from 'ws'

export interface Client {
  socket: WebSocket

  type: 'tv' | 'controller'

  sessionId?: string
}

export const clients =
  new Map<WebSocket, Client>()