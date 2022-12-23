import PropTypes from 'prop-types'

const Move = ({ move, onClick }) => {
  const desc = move ? `Go to move #${move}` : 'Go to game start'

  return (
    <li>
      <button onClick={() => { onClick(move) }}>{desc}</button>
    </li>
  )
}

Move.propTypes = {
  move: PropTypes.number,
  onClick: PropTypes.func
}

export default Move
