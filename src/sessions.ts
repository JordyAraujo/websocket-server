import { WebSocket } from 'ws'

export interface Session {
  id: string
  tv: WebSocket
  controllers: WebSocket[]
}

export const sessions = new Map<string, Session>()

export function createSession(tvSocket: WebSocket) {
  const sessionId = generateSessionId()
  sessions.set(sessionId, {
    id: sessionId,
    tv: tvSocket,
    controllers: []
  })
  return sessionId
}

function generateSessionId() {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()
}