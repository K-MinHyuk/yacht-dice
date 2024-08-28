// import { io } from 'socket.io-client'

import { $Boards, Board } from 'components/board'
import { $Dice, DiceState } from 'components/dice'
import { $Game } from 'components/game'
import { $Users, ConnectionStatus, PlayStatus, UserState } from 'components/user'

// const socket = io('http://localhost:3000', {
//   transports: ['websocket'],
// })
// socket.on('connect', () => console.log('connected'))
;(function main() {
  const root = document.querySelector('div#app')!

  // const actionPanel = document.createElement('div')
  // actionPanel.id = 'actions'

  const userAddButton = document.createElement('button')
  userAddButton.textContent = 'Add User'

  const boardPanel = document.createElement('div')

  boardPanel.id = 'boards'
  boardPanel.style.display = 'flex'
  boardPanel.style.flexDirection = 'row'
  boardPanel.style.flexWrap = 'wrap'
  boardPanel.style.gap = '1rem'

  const rollDice = document.createElement('button')
  rollDice.textContent = 'Roll Dice'

  ////////////////////////
  const dicebutton0 = document.createElement('button')
  dicebutton0.id = '0'
  dicebutton0.addEventListener('click', () => {
    const d_id = $Dice.get().dices[0].id
    $Dice.toggle(d_id)
  })

  const dicebutton1 = document.createElement('button')
  dicebutton1.id = '1'
  dicebutton1.addEventListener('click', () => {
    const d_id = $Dice.get().dices[1].id
    $Dice.toggle(d_id)
  })

  const dicebutton2 = document.createElement('button')
  dicebutton2.id = '2'
  dicebutton2.addEventListener('click', () => {
    const d_id = $Dice.get().dices[2].id
    $Dice.toggle(d_id)
  })

  const dicebutton3 = document.createElement('button')
  dicebutton3.id = '3'
  dicebutton3.addEventListener('click', () => {
    const d_id = $Dice.get().dices[3].id
    $Dice.toggle(d_id)
  })

  const dicebutton4 = document.createElement('button')
  dicebutton4.id = '4'
  dicebutton4.addEventListener('click', () => {
    const d_id = $Dice.get().dices[4].id
    $Dice.toggle(d_id)
  })

  const dicebutton5 = document.createElement('button')
  dicebutton5.id = '5'
  dicebutton5.addEventListener('click', () => {
    const d_id = $Dice.get().dices[5].id
    $Dice.toggle(d_id)
  })

  const dicebuttons = [dicebutton0, dicebutton1, dicebutton2, dicebutton3, dicebutton4, dicebutton5]
  ////////////////////////
  const userPanel = document.createElement('div')
  userPanel.id = 'users'

  root.appendChild(userAddButton)
  root.appendChild(boardPanel)
  root.appendChild(userPanel)

  root.appendChild(rollDice)
  root.appendChild(dicebutton0)
  root.appendChild(dicebutton1)
  root.appendChild(dicebutton2)
  root.appendChild(dicebutton3)
  root.appendChild(dicebutton4)
  root.appendChild(dicebutton5)

  userAddButton.addEventListener('click', () => {
    $Users.add()
  })

  rollDice.addEventListener('click', () => {
    $Dice.roll()
  })

  $Dice.subscribe((newDice) => {
    const dice = $Dice.get()
    if (dice.step === 3) {
      return
    }
    newDice.dices.map((one_dice, index) => {
      dicebuttons[index].textContent = '' + one_dice.value
    })
  })

  $Users.subscribe((newUsers) => {
    newUsers.map((user) => $Boards.register(user.info.id))
  })

  $Boards.subscribe((newBoards) => {
    const users = $Users.get()

    boardPanel.replaceChildren(
      ...Object.entries(newBoards)
        .map(([id, $board]) => {
          const wrapper = document.createElement('div')
          wrapper.style.display = 'flex'
          wrapper.style.border = '1px solid black'
          wrapper.style.flexDirection = 'column'
          wrapper.style.width = '250px'

          const title = document.createElement('h5')
          title.style.textAlign = 'center'

          const owner = users.find((user) => user.info.id === id)

          if (owner === undefined) {
            return null
          }

          title.textContent = owner.info.nickname

          wrapper.appendChild(title)
          for (const [k, v] of Object.entries($board.get().records)) {
            const record = document.createElement('div')
            record.style.display = 'flex'
            record.style.flexDirection = 'row'
            record.style.border = '1px solid black'

            const recordKey = document.createElement('span')
            recordKey.textContent = k
            recordKey.style.width = '140px'

            const recordValue = document.createElement('span')
            recordValue.textContent = `s: ${v.score}, r: ${v.round}`
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
})()
