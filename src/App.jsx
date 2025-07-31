import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Scoreboard from './components/Scoreboard';
import CardContainer from './components/CardContainer';
import KO from './components/KO';

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [hasLost, setHasLost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardCount, setCardCount] = useState(12);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch('https://api.octagon-api.com/fighters');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const fighters = Object.values(data).slice(0, cardCount);

        setCards(fighters);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [cardCount]);

  const shuffleCards = (cards) => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCardClick = (cardName) => {
    setCards(shuffleCards(cards));

    const alreadyClicked = clickedCards.includes(cardName);
    const newHighScore = currentScore > highScore;

    if (alreadyClicked) {
      if (newHighScore) {
        setHighScore(currentScore);
      }
      setCurrentScore(0);
      setClickedCards([]);
      setHasLost(true);
    } else {
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setClickedCards([...clickedCards, cardName]);
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      setHasLost(false);
    }
  };

  const handleCardCount = (e) => {
    const newCardCount = e.target.value;
    setCardCount(newCardCount);
  };

  const handlePlayAgain = () => {
    setHasLost(false);
  };

  return (
    <>
      {hasLost ? (
        <>
          <KO clickHandler={handlePlayAgain} />
        </>
      ) : (
        <>
          <Header />
          <Scoreboard
            currentScore={currentScore}
            highScore={highScore}
            cardCount={cardCount}
            cardCountHandler={handleCardCount}
          />
          <CardContainer
            isLoading={isLoading}
            cards={cards}
            clickHandler={handleCardClick}
          />
        </>
      )}
    </>
  );
}

export default App;
