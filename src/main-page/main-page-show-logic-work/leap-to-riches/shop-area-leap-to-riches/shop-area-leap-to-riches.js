import React, { useState, useEffect } from 'react';
import HeaderLeapToRiches from '../header-leap-to-riches/header-leap-to-riches';
import { itemsConfig } from './itemsConfig';
import './shop-area-leap-to-riches.css';

function ShopAreaLeapToRiches() {
  const [coins, setCoins] = useState(0);
  const [player, setPlayer] = useState(null);

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
        setCoins(data.coins);
      })
      .catch(error => console.error('Error fetching player:', error));
  };

  const handleBuyItem = (item) => {
    if (coins >= item.cost) {
      const updatedPlayer = { ...player, coins: coins - item.cost };
      item.applyEffect(updatedPlayer);

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
        .then(data => {
          setPlayer(updatedPlayer);
          setCoins(updatedPlayer.coins);
        })
        .catch(error => console.error('Error updating player:', error));
    } else {
      alert('You don\'t have enough money!');
    }
  };

  return (
    <div>
      <HeaderLeapToRiches coins={coins} />
      <div className="shop">
        <h2>SHOP</h2>
        {itemsConfig.map(item => (
          <div className="item" key={item.id}>
            <p>{item.name} - {item.description} (COST: {item.cost}$)</p>
            <button onClick={() => handleBuyItem(item)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopAreaLeapToRiches;