import '../styles/CardContainer.css';
import CardItem from './CardItem';
import Loading from './Loading';

function CardContainer({ cards, clickHandler, isLoading }) {
  const containerStyle = {
    display: isLoading ? 'flex' : 'grid',
    justifyContent: isLoading ? 'center' : undefined,
    alignItems: isLoading ? 'center' : undefined,
    height: isLoading ? '400px' : 'auto',
  };

  return (
    <div style={containerStyle} id="card-container">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {cards.map((card, index) => (
            <CardItem
              clickHandler={() => clickHandler(card.name)}
              key={index}
              name={card.name}
              imgUrl={card.imgUrl}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default CardContainer;
