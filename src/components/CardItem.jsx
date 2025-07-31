import '../styles/CardItem.css';

function CardItem({ name, imgUrl, clickHandler }) {
  return (
    <div onClick={clickHandler} className="card-item">
      <img src={imgUrl} alt={name} />
      <div className="card-text">
        <h2>{name}</h2>
      </div>
    </div>
  );
}

export default CardItem;
