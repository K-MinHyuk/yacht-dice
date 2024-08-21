export interface DiceState {
  id: string
  fixed: boolean
  value: number
}

export const DICE_COINT = 5

/*
주사위를 리셋하는 기능, 
주사위를 굴리는기능, 
주사위를 선택적으로 고정하는 기능, 
주사위가 몇 번 굴려졌는지 저장한 값을 가져오는 기능 주사위,
주사위 정보를 가져오는 기능
*/
export class Dice {
  public reset(): void {
    this.dices = Array(DICE_COINT)
      .fill(undefined)
      .map(() => ({
        id: window.crypto.randomUUID(),
        fixed: false,
        value: 1,
      }))
    this.step = 0
  }

  public roll(): DiceState[] {
    if (this.step === 3) {
      throw new Error('Over step')
    }
    this.dices.forEach((dice) => {
      if (!dice.fixed) {
        dice.value = Math.floor((Math.random() * 10) % 6) + 1
      }
    })
    this.step += 1
    return this.dices
  }

  public getStep(): number {
    return this.step
  }

  public toggleDice(id: number): void {
    this.dices[id].fixed = !this.dices[id].fixed
  }

  public getDice(): Array<object> {
    return this.dices.map((d) => {
      return { id: d.id, fixed: d.fixed, value: d.value }
    })
  }

  constructor() {
    this.reset()
  }
  private dices: DiceState[] = []
  private step: number = 0
}
