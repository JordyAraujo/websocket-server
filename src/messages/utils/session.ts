import { ControllerData } from "../../sessions"
import { CreateSessionMessage, GameStartedMessage, JoinSessionMessage, PlayerColorMessage, PlayerJoinedMessage, PlayersUpdatedMessage, SessionCreatedMessage, StartGameMessage } from "../session"
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
    value.payload.sessionId !== '' &&
    typeof value.payload.clientId === 'string' &&
    value.payload.clientId !== '' &&
    typeof value.payload.playerName === 'string' &&
    value.payload.playerName !== ''
  )
}

export function isPlayerColorMessage(value: unknown): value is PlayerColorMessage {
  return (
    isObject(value) &&
    value.type === 'player_color' &&
    isObject(value.payload) &&
    typeof value.payload.sessionId === 'string' &&
    value.payload.sessionId !== '' &&
    typeof value.payload.clientId === 'string' &&
    value.payload.clientId !== '' &&
    typeof value.payload.color === 'string' &&
    value.payload.color !== ''
  )
}

export const createPlayersUpdatedMessage = (sessionId: string, players: ControllerData[]): PlayersUpdatedMessage => ({
  type: 'players_updated',
  payload: {
    sessionId,
    players
  }
})

export function isStartGameMessage(value: unknown): value is StartGameMessage {
  return (
    isObject(value) &&
    value.type === 'start_game' &&
    isObject(value.payload) &&
    typeof value.payload.sessionId === 'string' &&
    value.payload.sessionId !== ''
  )
}

export const createGameStartedMessage = (): GameStartedMessage => ({
  type: 'game_started'
})