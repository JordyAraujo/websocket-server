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

export interface JoinSessionMessage {
  type: 'join_session'
  payload: {
    sessionId: string
  }
}

export function isCreateSessionMessage(value: unknown): value is CreateSessionMessage {
  return isObject(value) && !('payload' in value)
}

export function isJoinSessionMessage(value: unknown): value is JoinSessionMessage {
  return (
    isObject(value) &&
    isObject(value.payload) &&
    typeof value.payload.sessionId === 'string'
  )
}

export function isSessionCreatedMessage(value: unknown): value is SessionCreatedMessage {
  return (
    isObject(value) &&
    isObject(value.payload) &&
    typeof value.payload.sessionId === 'string'
  )
}