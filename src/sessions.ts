import { WebSocket } from 'ws'

export interface Controller {
  socket: WebSocket
  clientId: string
  playerName: string
  color?: string
}

export interface Session {
  id: string
  tv: WebSocket
  controllers: Controller[]
}

export const sessions = new Map<string, Session>()

export function createSession(tvSocket: WebSocket) {
  const sessionId = generateSessionId()
  const session: Session = {
    id: sessionId,
    tv: tvSocket,
    controllers: []
  }
  sessions.set(sessionId, session)
  return session
}

function generateSessionId() {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()
}