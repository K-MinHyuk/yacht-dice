import Table from 'pixi-table-layout'
import { Container, Graphics } from 'pixi.js'

import { BoardState, RecordKeyArray, RecordKeys } from 'components/board'
import { UserState } from 'components/user'
import { FancyText } from 'ui/Text'
import { getScoreOf } from 'utils/caculator'

export class ScoreBoard extends Container {
  public render(): void {
    const wrapper = new Graphics().roundRect(0, 0, 120, 200, 4).fill(0xffffff).stroke({ color: 0x000000, width: 2 })

    const table = new Table()
    table
      .row(20)
      .cell()
      .element(
        new FancyText({
          text: this.user.info.nickname,
          style: {
            fontSize: 8,
            fontWeight: 'bold',
          },
        }),
        'shrink',
      )

    for (const key of RecordKeyArray) {
      const value = this.board.records[key]
      table
        .row(20)
        .cell()
        .element(new FancyText({ text: key, style: { fontSize: 8 } }), 'shrink')
        .cell()
        .element(new FancyText({ text: value?.score.toString(), style: { fontSize: 8 } }))
    }

    table
      .row(20)
      .cell()
      .element(new FancyText({ text: 'Score', style: { fontSize: 8 } }), 'shrink')
      .cell()
      .element(
        new FancyText({
          text: Object.values(this.board.records).reduce((prev, curr) => prev + curr.score, 0),
          style: { fontSize: 8 },
        }),
        'shrink',
      )

    // NOTE: resize에 update 로직이 포함되어 있어, 데이터구조 지정 후 setSize를 호출해야 함
    table.setSize(120, 200)
    table.debug = process.env.NODE_ENV === 'development'
    wrapper.addChild(table)
    this.addChild(wrapper)
  }
  constructor(user: UserState, board: BoardState) {
    super()
    this.user = user
    this.board = board

    this.render()
  }

  public user: UserState
  public board: BoardState
}
