// import { io } from 'socket.io-client'

import { $Boards, Board } from 'components/board'
import { $Dice } from 'components/dice'
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

  // const rollDice = document.createElement('button')
  // rollDice.textContent = 'Roll Dice'

  const userPanel = document.createElement('div')
  userPanel.id = 'users'

  root.appendChild(userAddButton)
  root.appendChild(boardPanel)
  root.appendChild(userPanel)

  userAddButton.addEventListener('click', () => {
    $Users.add()
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
