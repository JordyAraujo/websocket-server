import { ControllerData } from "../sessions"

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
    sessionId: string,
    clientId: string,
    playerName: string
  }
}

export interface PlayerJoinedMessage {
  type: 'player_joined'
  payload: {
    clientId: string
    playerName: string
  }
}

export interface PlayerColorMessage {
  type: 'player_color'
  payload: {
    sessionId: string
    clientId: string
    color: string
  }
}

export interface PlayersUpdatedMessage {
  type: 'players_updated'
  payload: {
    players: ControllerData[]
  }
}