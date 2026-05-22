import { isObject } from './util'

const inputButtons = ['up', 'down', 'left', 'right', 'ok', 'roll_dice'] as const

export type InputButton = (typeof inputButtons)[number]

export interface InputMessage {
  type: 'input'
  payload: {
    button: InputButton
  }
}

function isInputButton(value: unknown): value is InputButton {
  return typeof value === 'string' && inputButtons.includes(value as InputButton)
}

export function isInputMessage(value: unknown): value is InputMessage {
  return (
    isObject(value) &&
    isObject(value.payload) &&
    isInputButton(value.payload.button)
  )
}
