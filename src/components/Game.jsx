import { useState } from 'react'
import Board from './Board'
import Move from './Move'

const X = 'X'
const O = 'O'

const Game = () => {
  /**
   * Board example:
   *
   * [
   *    'O', null, 'X',
   *    'X', 'X', 'O',
   *    'O', null, null,
   * ]
   */
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null)
  }])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setxIsNext] = useState(true)

  function getTurn () {
    return xIsNext ? X : O
  }

  function getMsg () {
    let status = `Next player: ${getTurn()}`
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares)

    if (winner) {
      status = `Winner: ${winner}`
    } else {
      if (current.squares.every(el => el !== null)) {
        status = 'Draw!'
      }
    }

    return status
  }

  function handleClick (i) {
    const historyC = history.slice(0, stepNumber + 1)
    const current = historyC[historyC.length - 1]
    const squaresC = current.squares.slice() // copy of state --> immutability

    if (calculateWinner(squaresC) || squaresC[i]) {
      return
    }

    squaresC[i] = getTurn()
    setHistory(historyC.concat([{
      squares: squaresC
    }]))
    setStepNumber(historyC.length)
    setxIsNext(!xIsNext)
  }

  function calculateWinner (squares) {
    // FIXME: winning lines
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [s1, s2, s3] = lines[i]

      if (squares[s1] && squares[s1] === squares[s2] && squares[s1] === squares[s3]) {
        return squares[s1]
      }
    }

    return null
  }

  function jumpTo (step) {
    setStepNumber(step)
    setxIsNext((step % 2) === 0)
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          squares={history[stepNumber].squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className='game-info'>
        <div className='status'>{getMsg()}</div>
        <ol>
          {
            history.map((step, move) =>
              <Move
                key={`move#${move}`}
                move={move}
                onClick={(step) => { jumpTo(step) }}
              />
            )
          }
        </ol>
      </div>
    </div>
  )
}

export default Game
