<<<<<<< HEAD
import { Application, Assets, Sprite, Spritesheet, AnimatedSprite } from 'pixi.js'
=======
import { FancyButton, List } from '@pixi/ui'
import { Application } from 'pixi.js'
>>>>>>> af32d48f0c8c8ff69c07edc05ac1a4ee955713d6

import { $Boards, BonusRecordKey, BonusScore, RecordKeyArray, RecordKeys } from 'components/board'
import { $Dice, MAX_DICE_STEP } from 'components/dice'
import { $Game, GameStage } from 'components/game'
import { $TemporaryScore } from 'components/temporary-score'
import { $Users } from 'components/user'
import { ScoreBoard } from 'ui/ScoreBoard'
import { FancyText } from 'ui/Text'
import { isAchieveBonus, getScoreOf } from 'utils/caculator'
import { MAX_ROUND, validate } from 'utils/validater'
<<<<<<< HEAD
/*
hi
*/
// Create a PixiJS application.
const app = new Application()
// Intialize the application.
await app.init({ background: '#1099bb', resizeTo: window })
document.getElementById('app')?.appendChild(app.canvas)

const sheet = new Spritesheet(
  await Assets.load('src/images/d6Red.png'),
  (await Assets.load('src/images/d6Red.json')).data,
)
await sheet.parse()

const rollAnimations = [
  new AnimatedSprite(sheet.animations.roll01),
  new AnimatedSprite(sheet.animations.roll02),
  new AnimatedSprite(sheet.animations.roll03),
  new AnimatedSprite(sheet.animations.roll04),
  new AnimatedSprite(sheet.animations.roll05),
]

for (let i = 0; i < rollAnimations.length; i++) {
  const roll = rollAnimations[i]

  roll.animationSpeed = 0.1666 * 3
  roll.loop = false
  roll.x = 100 + i * 100
  const s = roll.getSize()
  roll.setSize(s.height * 0.1, s.width * 0.1)
  roll.play()
  app.stage.addChild(roll)
}
/*
hi
*/
=======

const app = new Application()

await app.init({ resolution: Math.max(window.devicePixelRatio, 2), backgroundColor: 0xffffff, resizeTo: window })
document.getElementById('app')?.appendChild(app.canvas)

// const sheet = new Spritesheet(await Assets.load('public/d6Red.png'), (await Assets.load('public/d6Red.json')).data)
// await sheet.parse()

// const rollAnimations = [
//   new AnimatedSprite(sheet.animations.roll01),
//   new AnimatedSprite(sheet.animations.roll02),
//   new AnimatedSprite(sheet.animations.roll03),
//   new AnimatedSprite(sheet.animations.roll04),
//   new AnimatedSprite(sheet.animations.roll05),
// ]

// for (let i = 0; i < rollAnimations.length; i++) {
//   const roll = rollAnimations[i]

//   roll.animationSpeed = 0.1666 * 3
//   roll.x = 100 + i * 100
//   roll.play()
//   app.stage.addChild(roll)
// }

const userList = new List<ScoreBoard>({
  children: [],
  type: 'horizontal',
  elementsMargin: 16,
  padding: 10,
})
userList.position.set(0, 10)
app.stage.addChild(userList)

const userAddButton = new FancyButton({
  text: new FancyText({ text: '플레이어 추가', style: { fontSize: 12, fontWeight: 'bold' } }),
})
userAddButton.onPress.connect(() => $Users.add())
userAddButton.position.set(app.screen.width / 2, app.screen.height - 100)

app.stage.addChild(userAddButton)

$Users.subscribe((users) => {
  if (users.length === 0) {
    $Game.reset()
  }
  if (users.length > 0) {
    $Game.ready()
  }
  users.map((user) => $Boards.register(user.info.id))
})

$Boards.subscribe((boards) => {
  const users = $Users.get()

  const registeredUserID = userList.children.map((child) => child.user.info.id)

  for (const [id, board] of Object.entries(boards)) {
    const target = users.find((user) => user.info.id === id)
    if (!target) {
      return
    }
    if (!registeredUserID.includes(id)) {
      const scoreBoard = new ScoreBoard(target, board)
      userList.addChild(scoreBoard)
    }
  }
})
// const startButton = new Button()
// startButton.onPress.connect(() => {
//   const prev = $Game.get()
//   if (prev.stage !== GameStage.READY) {
//     return
//   }
//   const users = $Users.get()
//   $Game.startGame(users[0].info.id)
// })

// const rollDiceButton = new Button()
// rollDiceButton.onPress.connect(() => {
//   $Dice.roll()
// })

// const turnEndButton = new Button()
// turnEndButton.onPress.connect(() => {
//   const dice = $Dice.get()

//   if (dice.step === 0) {
//     return
//   }

//   const current = $Game.get()
//   if (current.turn === null) {
//     return
//   }

//   const temporary = $TemporaryScore.get()
//   if (temporary.checkedKey === null || temporary.scores === null) {
//     return
//   }

//   const currentBoard = $Boards.getAll(current.turn)
//   $Boards.setRecord(current.turn, temporary.checkedKey, {
//     round: current.round,
//     score: temporary.scores[temporary.checkedKey],
//   })

//   if (
//     currentBoard &&
//     isAchieveBonus({
//       ...currentBoard,
//       records: {
//         ...currentBoard.records,
//         [temporary.checkedKey]: {
//           round: current.round,
//           score: temporary.scores[temporary.checkedKey],
//         },
//       },
//     })
//   ) {
//     $Boards.setRecord(current.turn, BonusRecordKey, {
//       round: current.round,
//       score: BonusScore,
//     })
//   }

//   const users = $Users.get()
//   const currentUserIndex = users.findIndex((user) => user.info.id === current.turn)

//   if (currentUserIndex + 1 === users.length) {
//     $Game.nextRound(users[0].info.id)
//     $TemporaryScore.reset()
//     $Dice.reset()
//     return
//   }

//   $Game.setTurn(users[(currentUserIndex + 1) % users.length].info.id)
//   $TemporaryScore.reset()
//   $Dice.reset()
// })

// const endButton = new Button()
// endButton.onPress.connect(() => {
//   $Game.regame()
//   $Boards.erase()
//   $Dice.reset()
// })

>>>>>>> af32d48f0c8c8ff69c07edc05ac1a4ee955713d6
function main() {
  const root = document.querySelector('div#app')!

  const userAddButton = document.createElement('button')
  userAddButton.textContent = 'Add User'

  const boardPanel = document.createElement('div')
  boardPanel.id = 'boards'
  boardPanel.style.display = 'flex'
  boardPanel.style.flexDirection = 'row'
  boardPanel.style.flexWrap = 'wrap'
  boardPanel.style.gap = '1rem'

  const dicePanel = document.createElement('div')
  dicePanel.style.display = 'flex'
  dicePanel.style.justifyContent = 'flex-start'
  dicePanel.style.alignItems = 'center'

  const rollDiceButton = document.createElement('button')
  rollDiceButton.textContent = 'Roll Dice'
  rollDiceButton.addEventListener('click', () => {
    $Dice.roll()
  })

  const actionPanel = document.createElement('div')
  actionPanel.style.marginTop = '100px'

  const startButton = document.createElement('button')
  startButton.textContent = 'Start Game'
  startButton.addEventListener('click', () => {
    const prev = $Game.get()
    if (prev.stage !== GameStage.READY) {
      return
    }
    const users = $Users.get()
    $Game.startGame(users[0].info.id)
  })

  const turnEndButton = document.createElement('button')
  turnEndButton.textContent = 'End Turn'
  turnEndButton.addEventListener('click', () => {
    const dice = $Dice.get()

    if (dice.step === 0) {
      return
    }

    const current = $Game.get()
    if (current.turn === null) {
      return
    }

    const temporary = $TemporaryScore.get()
    if (temporary.checkedKey === null || temporary.scores === null) {
      return
    }

    const currentBoard = $Boards.getAll(current.turn)
    $Boards.setRecord(current.turn, temporary.checkedKey, {
      round: current.round,
      score: temporary.scores[temporary.checkedKey],
    })

    if (
      currentBoard &&
      isAchieveBonus({
        ...currentBoard,
        records: {
          ...currentBoard.records,
          [temporary.checkedKey]: {
            round: current.round,
            score: temporary.scores[temporary.checkedKey],
          },
        },
      })
    ) {
      $Boards.setRecord(current.turn, BonusRecordKey, {
        round: current.round,
        score: BonusScore,
      })
    }

    const users = $Users.get()
    const currentUserIndex = users.findIndex((user) => user.info.id === current.turn)

    if (currentUserIndex + 1 === users.length) {
      $Game.nextRound(users[0].info.id)
      $TemporaryScore.reset()
      $Dice.reset()
      return
    }

    $Game.setTurn(users[(currentUserIndex + 1) % users.length].info.id)
    $TemporaryScore.reset()
    $Dice.reset()
  })

  const userPanel = document.createElement('div')
  userPanel.id = 'users'

  root.appendChild(boardPanel)
  root.appendChild(userPanel)
  root.appendChild(dicePanel)
  root.appendChild(actionPanel)

  userAddButton.addEventListener('click', () => {
    $Users.add()
  })

  $Game.subscribe((game) => {
    actionPanel.innerHTML = ''

    if (game.stage === GameStage.PLAYING) {
      if (game.round >= MAX_ROUND) {
        $Game.set({
          ...game,
          stage: GameStage.FINISH,
          winner: validate({
            boards: $Boards.get(),
            currentRound: game.round - 1,
          }).userRank[0].userID,
        })
      }
      actionPanel.appendChild(rollDiceButton)
      actionPanel.appendChild(turnEndButton)

      const element = document.createElement('span')
      element.textContent = `Round: ${game.round}`
      actionPanel.appendChild(element)
    }
    if (game.stage === GameStage.READY) {
      actionPanel.appendChild(startButton)
    }
    if (game.stage === GameStage.READY || game.stage === GameStage.WAITING) {
      actionPanel.appendChild(userAddButton)
    }

    if (game.stage === GameStage.PLAYING) {
      const elements = [...document.getElementsByClassName('boards')]

      for (const e of elements) {
        if (e.id === game.turn) {
          ;(e as HTMLDivElement).style.backgroundColor = 'gray'
        }
      }
    }

    if (game.stage === GameStage.FINISH) {
      const endButton = document.createElement('button')
      endButton.addEventListener('click', () => {
        $Game.regame()
        $Boards.erase()
        $Dice.reset()
      })
      const user = $Users.get().find((user) => user.info.id === game.winner)
      const nickname = user?.info.nickname ?? ''
      const score = Object.values($Boards.getAll(user?.info.id ?? '')?.records ?? {}).reduce(
        (prev, curr) => prev + curr.score,
        0,
      )

      endButton.textContent = `The Winner is... ${nickname} (${score} 점)!!! Click To Reset Game`

      actionPanel.appendChild(endButton)
    }
  })

  $Dice.subscribe(({ dices, step }) => {
    const currentGame = $Game.get()

    if (currentGame.stage !== GameStage.PLAYING) {
      return
    }

    if (0 < step && step <= MAX_DICE_STEP) {
      $TemporaryScore.set({
        ...$TemporaryScore.get(),
        scores: RecordKeyArray.reduce(
          (prev, key) => {
            prev[key] = getScoreOf(key, dices)
            return prev
          },
          {} as Record<RecordKeys, number>,
        ),
      })
    }
    const diceElements = dices.map((dice) => {
      const elem = document.createElement('div')
      elem.textContent = String(dice.value)
      elem.style.width = '50px'
      elem.style.height = '100px'
      elem.style.border = dice.fixed ? '1px solid black' : ''

      elem.addEventListener('click', () => {
        $Dice.toggle(dice.id)
      })

      return elem
    })

    const stepElem = document.createElement('div')
    stepElem.textContent = `step: ${step}`
    stepElem.style.display = 'flex'
    stepElem.style.width = '120px'
    stepElem.style.height = '100px'

    dicePanel.replaceChildren(...diceElements, stepElem)
  })

  $TemporaryScore.subscribe((temp) => {
    const id = $Game.get().turn

    if (temp.scores === null) {
      return
    }
    for (const e of document.getElementsByClassName(`${id} value`)) {
      const key = e.getAttribute('data-key')
      const already = e.getAttribute('data-already')

      if (already === 'true' || !key) {
        continue
      }

      const element = document.createElement('span')
      element.style.color = temp.checkedKey === key ? 'red' : 'blue'
      element.textContent = String(temp.scores[key as RecordKeys])
      e.addEventListener('click', () => {
        $TemporaryScore.set({
          ...$TemporaryScore.get(),
          checkedKey: key as RecordKeys,
        })
      })

      e.replaceChildren(element)
    }
  })

  $Users.subscribe((newUsers) => {
    if (newUsers.length === 0) {
      $Game.reset()
    }
    if (newUsers.length > 0) {
      $Game.ready()
    }
    newUsers.map((user) => $Boards.register(user.info.id))
  })

  $Boards.subscribe((newBoards) => {
    const users = $Users.get()

    boardPanel.replaceChildren(
      ...Object.entries(newBoards)
        .map(([id, board]) => {
          const wrapper = document.createElement('div')
          wrapper.style.display = 'flex'
          wrapper.style.border = '1px solid black'
          wrapper.style.flexDirection = 'column'
          wrapper.style.width = '250px'
          wrapper.id = id
          wrapper.className = 'boards'

          const title = document.createElement('h5')
          title.style.textAlign = 'center'

          const owner = users.find((user) => user.info.id === id)

          if (owner === undefined) {
            return null
          }

          title.textContent = owner.info.nickname

          wrapper.appendChild(title)
          for (const key of RecordKeyArray) {
            const record = document.createElement('div')
            record.style.display = 'flex'
            record.style.flexDirection = 'row'
            record.style.border = '1px solid black'

            const recordKey = document.createElement('span')
            recordKey.textContent = key
            recordKey.style.width = '140px'

            const value = board.records[key]

            const recordValue = document.createElement('span')

            recordValue.textContent = value ? `s: ${value.score}, r: ${value.round}` : ''
            recordValue.style.flex = '1 0 0'
            recordValue.className = `${id} value`
            recordValue.setAttribute('data-key', key)
            if (value) {
              recordValue.setAttribute('data-already', 'true')
            }

            record.appendChild(recordKey)
            record.appendChild(recordValue)

            wrapper.appendChild(record)
          }

          {
            const bonusRow = document.createElement('div')
            bonusRow.style.display = 'flex'
            bonusRow.style.flexDirection = 'row'
            bonusRow.style.border = '1px solid black'

            const recordKey = document.createElement('span')
            recordKey.textContent = '> 63 Bonus'
            recordKey.style.width = '140px'

            const value = board.records[BonusRecordKey]

            const recordValue = document.createElement('span')

            recordValue.textContent = value ? `s: ${value.score}, r: ${value.round}` : ''
            recordValue.style.flex = '1 0 0'

            bonusRow.appendChild(recordKey)
            bonusRow.appendChild(recordValue)

            wrapper.appendChild(bonusRow)
          }

          const totalRow = document.createElement('div')
          totalRow.style.display = 'flex'
          totalRow.style.flexDirection = 'row'
          totalRow.style.border = '1px solid black'
          totalRow.textContent = `Total: ${Object.values(board.records).reduce((prev, curr) => prev + curr.score, 0)}`
          wrapper.appendChild(totalRow)

          return wrapper
        })
        .filter((elem) => elem !== null),
    )
  })
}

// window.addEventListener('load', main)
