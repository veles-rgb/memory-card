import '../styles/KO.css';

function KO({ clickHandler }) {
  return (
    <div id="ko-container">
      <h1>KO!</h1>
      <button onClick={clickHandler}>Try Again</button>
    </div>
  );
}

export default KO;
