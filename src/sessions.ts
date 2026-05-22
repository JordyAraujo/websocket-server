import { WebSocket } from 'ws'

export interface Session {
  id: string
  tv: WebSocket | null
  controllers: WebSocket[]
}

export const sessions = new Map<string, Session>()

export function generateSessionId() {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()
}