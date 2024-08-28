import { $Boards, RecordKeyArray } from 'components/board'
import { $Dice } from 'components/dice'
import { $Game, GameStage } from 'components/game'
import { $Users } from 'components/user'
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
    const currentUserIndex = $Game.get().turn
    $Dice.roll()
    for (const key of RecordKeyArray) {
      const span = document.getElementById(key + currentUserIndex)
      if (span) {
        span.textContent = '' + $Boards.getScore(key, $Dice.get().dices)
      }
    }
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

    // todo
    $Boards.setRecord(current.turn, 'Yacht', {
      round: current.round,
      score: dice.dices.reduce((prev, curr) => prev + curr.value, 0),
    })

    const users = $Users.get()
    const currentUserIndex = users.findIndex((user) => user.info.id === current.turn)

    if (currentUserIndex + 1 === users.length) {
      $Game.nextRound(users[0].info.id)
    } else {
      $Game.setTurn(users[(currentUserIndex + 1) % users.length].info.id)
    }
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
  })

  $Dice.subscribe(({ dices, step }) => {
    const currentGame = $Game.get()

    if (currentGame.stage !== GameStage.PLAYING) {
      return
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

  // qqqqq
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

            const value = board?.records[key]
            const recordValue = document.createElement('span')
            recordValue.id = key + id

            recordValue.textContent = value ? `s: ${value.score}, r: ${value.round}` : ''
            recordValue.style.flex = '1 0 0'

            record.appendChild(recordKey)
            record.appendChild(recordValue)

            wrapper.appendChild(record)
          }

          return wrapper
        })
        .filter((elem) => elem !== null),
    )
  })
}

window.addEventListener('load', main)
