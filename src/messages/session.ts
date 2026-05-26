import { isObject } from './util'

export interface CreateSessionMessage {
  type: 'create_session'
}

export interface SessionCreatedMessage {
  type: 'session_created'
  payload: {
    sessionId: string
  }
}

export const createSessionCreatedMessage = (sessionId: string): SessionCreatedMessage => ({
  type: 'session_created',
  payload: {
    sessionId
  }
})

export interface JoinSessionMessage {
  type: 'join_session'
  payload: {
    sessionId: string,
    clientId: string
  }
}

export interface JoinedSessionMessage {
  type: 'joined_session',
  payload: {
    sessionId: string,
    clientId: string
  }
}

export const createJoinedSessionMessage = (sessionId: string, clientId: string): JoinedSessionMessage => ({
  type: 'joined_session',
  payload: {
    sessionId,
    clientId
  }
})

export function isCreateSessionMessage(value: unknown): value is CreateSessionMessage {
  return isObject(value) && value.type === 'create_session' && !('payload' in value)
}

export function isJoinSessionMessage(value: unknown): value is JoinSessionMessage {
  return (
    isObject(value) &&
    value.type === 'join_session' &&
    isObject(value.payload) &&
    typeof value.payload.sessionId === 'string' &&
    typeof value.payload.clientId === 'string'
  )
}