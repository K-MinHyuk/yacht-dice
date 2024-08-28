import { map } from 'nanostores'

import { DiceState } from 'components/dice'
import { UserState } from 'components/user'

export type RecordKeys =
  | 'one'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'Choice'
  | '4 of a Kind'
  | 'Full House'
  | 'S. Straight'
  | 'L. Straight'
  | 'Yacht'

export const RecordKeyArray: RecordKeys[] = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'Choice',
  '4 of a Kind',
  'Full House',
  'S. Straight',
  'L. Straight',
  'Yacht',
]

export interface BoardState {
  records: Partial<
    Record<
      RecordKeys,
      {
        round: number
        score: number
      }
    >
  >
}

export function Board(): BoardState {
  const initial: BoardState = {
    records: {} as BoardState['records'],
  }
  return initial
}

const state = map<Record<UserState['info']['id'], ReturnType<typeof Board>>>()

export const $Boards = Object.assign(state, {
  register: (id: UserState['info']['id']): void => {
    const prev = state.get()
    if (Object.keys(prev).includes(id)) {
      return
    }

    state.setKey(id, Board())
  },
  setRecord(id: UserState['info']['id'], key: RecordKeys, params: { round: number; score: number }): void {
    const board = state.get()[id]
    if (board === undefined) {
      return
    }
    state.setKey(id, {
      ...board,
      records: {
        ...board.records,
        [key]: { ...params },
      },
    })
  },
  getAll: (id: UserState['info']['id']): ReturnType<typeof Board> | undefined => {
    return state.get()[id]
  },
  getByKey: (
    id: UserState['info']['id'],
    key: RecordKeys,
    check: boolean,
  ): ReturnType<typeof Board>['records'][RecordKeys] | undefined => {
    const board = state.get()[id]
    if (board === undefined) {
      return
    }
    return board.records[key]
  },
  getScore: (key: string, dices: DiceState[]): number | undefined => {
    const diceCombi = dices
    let sum = 0
    switch (key) {
      case 'one':
        diceCombi.map((onedice: DiceState) => {
          if (onedice.value === 1) {
            sum += onedice.value
          } else {
            return
          }
        })
        return sum
        break
      case 'two':
        diceCombi.map((onedice: DiceState) => {
          if (onedice.value === 2) {
            sum += onedice.value
          } else {
            return
          }
        })
        return sum
        break
      case 'three':
        diceCombi.map((onedice: DiceState) => {
          if (onedice.value === 3) {
            sum += onedice.value
          } else {
            return
          }
        })
        return sum
        break
      case 'four':
        diceCombi.map((onedice: DiceState) => {
          if (onedice.value === 4) {
            sum += onedice.value
          } else {
            return
          }
        })
        return sum
        break
      case 'five':
        diceCombi.map((onedice: DiceState) => {
          if (onedice.value === 5) {
            sum += onedice.value
          } else {
            return
          }
        })
        return sum
        break
      case 'six':
        diceCombi.map((onedice: DiceState) => {
          if (onedice.value === 6) {
            sum += onedice.value
          } else {
            return
          }
        })
        return sum
        break
      case 'Choice':
        diceCombi.map((onedice: DiceState) => {
          sum += onedice.value
        })
        return sum
        break
      //   case '4 of a Kind':
      //     break;
      //   case 'Full House':
      //     break;
      //   case 'S. Straight':
      //     break;
      //   case 'L. Straight':
      //     break;
      //   case 'Yacht':
      //     break;
      //   default:
      //     return undefined
      // }
    }
  },
})
