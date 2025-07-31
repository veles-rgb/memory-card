import '../styles/Scoreboard.css';

function Scoreboard({ currentScore, highScore, cardCount, cardCountHandler }) {
  return (
    <div id="scoreboard">
      <div className="current-score">Score: {currentScore}</div>-
      <div className="high-score">High Score: {highScore}</div>-
      <div className="card-count-input">
        <label htmlFor="card-count">Card Count</label>
        <input
          type="number"
          name="cardCount"
          id="card-count"
          min="6"
          max="60"
          step="1"
          value={cardCount}
          onChange={cardCountHandler}
        />
      </div>
    </div>
  );
}

export default Scoreboard;
