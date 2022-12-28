import PropTypes from 'prop-types'
import Square from './Square'

const Board = ({ squares, onClick }) => {
  function renderSquare (i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => { onClick(i) }}
      />
    )
  }

  const number = Math.sqrt(squares.length)

  return (
    <div>
      {
        [...Array(number).keys()].map((row) =>
          <div className='board-row' key={`row-#${row}`}>
            {
              [...Array(number).keys()].map((col) =>
                <span key={`row-#${row}-col-#${col}`}>
                  {renderSquare((row * 3 + col))}
                </span>)
            }
          </div>
        )
      }
    </div>
  )
}

Board.propTypes = {
  squares: PropTypes.array,
  onClick: PropTypes.func
}

export default Board
