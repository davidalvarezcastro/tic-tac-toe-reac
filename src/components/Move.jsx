import PropTypes from 'prop-types'

const Move = ({ move, data, onClick }) => {
  const desc = move ? `Go to move #${move}` : 'Go to game start'

  return (
    <li>
      <button onClick={() => { onClick(move) }}>{desc}</button>
      {
        data.pos !== null &&
          <span>
            (C#{data.pos.col} - R#{data.pos.row})
          </span>
      }
    </li>
  )
}

Move.propTypes = {
  move: PropTypes.number,
  data: PropTypes.object,
  onClick: PropTypes.func
}

export default Move
