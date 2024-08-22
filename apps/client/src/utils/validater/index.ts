import { BoardState } from 'components/board'
import { UserState } from 'components/user'

export const PLAYER_COUNT = { min: 2, max: 6 } as const
export const MAX_ROUND = 12

type UserID = UserState['info']['id']

interface Props {
  currentRound: number
  boards: (BoardState & { userID: UserID })[]
}

interface Returns {
  gameEnd: boolean
  userRank: {
    userID: UserID
    score: number
  }[]
}

/**
 * props는 현재 게임의 요트 다이스 보드 정보가 전달되면,
 * return으로 승패 및 순위 등을 포함해서, 게임의 결과를 반환한다.
 */
export function validate(props: Props): Returns {
  if (props.currentRound > MAX_ROUND || props.currentRound < 0) {
    throw new Error('게임 라운드가 초과되었습니다.')
  }
  if (props.boards.length < PLAYER_COUNT.min || props.boards.length > PLAYER_COUNT.max) {
    throw new Error('플레이어 수가 부족하거나 초과되었습니다.')
  }

  const gameEnd = props.boards.every((board) => {
    const keys = Object.keys(board.records)

    if (keys.length !== MAX_ROUND) {
      return false
    }

    const set = new Set<number>()
    for (const v of Object.values(board.records)) {
      set.add(v.round)
    }

    for (let i = 1; i <= MAX_ROUND; i++) {
      if (!set.has(i)) {
        return false
      }
    }

    return true
  })

  const userRank = props.boards
    .map((board) => ({
      userID: board.userID,
      score: Object.values(board.records).reduce((prev, { score }) => prev + score, 0),
    }))
    .sort(({ score: a }, { score: b }) => b - a)

  return {
    gameEnd,
    userRank,
  }
}
