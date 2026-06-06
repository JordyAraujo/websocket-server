import { Controller } from '../sessions'
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

export interface PlayerJoinedMessage {
  type: 'player_joined'
  payload: {
    players: {}
  }
}

export const createPlayerJoinedMessage = (controllers: Controller[]): PlayerJoinedMessage => ({
  type: 'player_joined',
  payload: {
    players: controllers.map(controller => ({
      clientId: controller.clientId,
      playerName: controller.playerName
    }))
  }
})

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
    clientId: string,
    playerName: string
  }
}

export function isCreateSessionMessage(value: unknown): value is CreateSessionMessage {
  return isObject(value) && value.type === 'create_session' && !('payload' in value)
}

export function isJoinSessionMessage(value: unknown): value is JoinSessionMessage {
  return (
    isObject(value) &&
    value.type === 'join_session' &&
    isObject(value.payload) &&
    typeof value.payload.sessionId === 'string' &&
    typeof value.payload.clientId === 'string' &&
    typeof value.payload.playerName === 'string'
  )
}