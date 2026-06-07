import { ControllerData } from "../../sessions"
import { CreateSessionMessage, JoinSessionMessage, PlayerColorMessage, PlayerJoinedMessage, PlayersUpdatedMessage, SessionCreatedMessage } from "../session"
import { isObject } from "./object"

export const createPlayerJoinedMessage = (controller: ControllerData): PlayerJoinedMessage => ({
  type: 'player_joined',
  payload: {
    clientId: controller.clientId,
    playerName: controller.playerName
  }
})

export const createSessionCreatedMessage = (sessionId: string): SessionCreatedMessage => ({
  type: 'session_created',
  payload: {
    sessionId
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
    typeof value.payload.clientId === 'string' &&
    typeof value.payload.playerName === 'string'
  )
}

export function isPlayerColorMessage(value: unknown): value is PlayerColorMessage {
  return (
    isObject(value) &&
    value.type === 'player_color' &&
    isObject(value.payload) &&
    typeof value.payload.sessionId === 'string' &&
    typeof value.payload.clientId === 'string' &&
    typeof value.payload.color === 'string'
  )
}

export const createPlayersUpdatedMessage = (players: ControllerData[]): PlayersUpdatedMessage => ({
  type: 'players_updated',
  payload: {
    players
  }
})