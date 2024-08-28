import { Board } from 'components/board'
import { Dice, DiceState } from 'components/dice'
import { UserState } from 'components/user'
import { MAX_ROUND, PLAYER_COUNT } from 'utils/validater'

export enum GameStage {
  WAITING = 0,
  READY = 1,
  PLAYING = 2,
  FINISH = 3,
}
interface GameStatus {
  users: UserState[]
  boards: Record<UserState['info']['id'], Board>
  dice: Dice

  turn: UserState['info']['id'] | null
  round: number

  winner: UserState['info']['id'] | null
  end: boolean

  stage: GameStage
}

export class Game {
  // game status
  public ready(): boolean {
    return this.state.stage === GameStage.READY
  }

  public startNextTurn(): void {
    if (this.state.stage !== GameStage.PLAYING) {
      throw new Error('The game is not started')
    }
    if (this.state.turn === null) {
      throw new Error('The turn is not set')
    }

    const index = this.state.users.findIndex((user) => user.info.id === this.state.turn)
    if (index === -1) {
      throw new Error('The turn is not in the users')
    }

    const next = (index + 1) % this.state.users.length
    this.state.turn = this.state.users[next].info.id

    if (next === 0) {
      this.startNextRound()
    }
  }

  public startNextRound(): void {
    if (this.state.stage !== GameStage.PLAYING) {
      throw new Error('The game is not started')
    }

    if (this.state.round === 0) {
      this.state.turn = this.state.users[0].info.id
    }

    this.state.round += 1

    if (this.state.round > MAX_ROUND) {
      this.state.stage = GameStage.FINISH
      this.state.end = true
    }
  }

  // users
  public getBoardByUser(userID: string): Board | null {
    return this.state.boards[userID]
  }
  public getCurrentUser(): string | null {
    if (this.state.stage !== GameStage.PLAYING) {
      return null
    }
    if (this.state.turn === null) {
      return null
    }

    return this.state.turn
  }

  public addUser(user: UserState): void {
    if (this.state.users.length >= PLAYER_COUNT.max) {
      throw new Error('The room is full')
    }
    const board = new Board()

    this.state.users.push(user)
    this.state.boards[user.info.id] = board

    if (this.state.users.length >= PLAYER_COUNT.min) {
      this.state.stage = GameStage.READY
    }
  }

  // boards

  // dices
  public rollDice(): DiceState[] {
    if (this.state.stage !== GameStage.PLAYING) {
      throw new Error('The game is not started')
    }
    if (this.state.turn === null) {
      throw new Error('The turn is not set')
    }

    return this.state.dice.roll()
  }

  constructor() {
    this.state = {
      users: [],
      boards: {},
      dice: new Dice(),

      turn: null,
      round: -1,

      winner: null,
      end: false,

      stage: GameStage.WAITING,
    }
  }

  private readonly state: GameStatus
}
