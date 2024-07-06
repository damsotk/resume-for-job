import React, { useState, useEffect } from 'react';
import HeaderLeapToRiches from './header-leap-to-riches/header-leap-to-riches';
import MainPlayingAreaLeapToRiches from './main-playing-area-leap-to-riches/main-playing-area-leap-to-riches';
import './leap-to-riches.css';

function LeapToRiches() {
  const [player, setPlayer] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [clicksNeededForCoin, setClicksNeededForCoin] = useState(10);

  useEffect(() => {
    fetchPlayer();
  }, []);

  const fetchPlayer = () => {
    fetch('http://localhost:3000/leap-to-riches/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPlayer(data);
        if (data.store_bought_items && data.store_bought_items.click_power_item === 'level 2') {
          setClicksNeededForCoin(5);
        }
      })
      .catch(error => console.error('Error fetching player:', error));
  };

  const updatePlayer = (updatedPlayer) => {
    fetch(`http://localhost:3000/leap-to-riches/1`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlayer),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setPlayer(data))
      .catch(error => console.error('Error updating player:', error));
  };

  const handleCoinClick = () => {
    if (player) {
      const updatedPlayer = { ...player };
      const newClickCount = clickCount + 1;
      setClickCount(newClickCount);

      if (newClickCount >= clicksNeededForCoin) {
        updatedPlayer.coins += 1;
        setClickCount(0);
      }

      updatePlayer(updatedPlayer);
    }
  };

  return (
    <div>
      {player ? (
        <div>
          <HeaderLeapToRiches coins={player.coins} />
          <MainPlayingAreaLeapToRiches
            onCoinClick={handleCoinClick}
            clickCount={clickCount}
            hasLevel2ClickPower={player.store_bought_items && player.store_bought_items.click_power_item === 'level 2'}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default LeapToRiches;
