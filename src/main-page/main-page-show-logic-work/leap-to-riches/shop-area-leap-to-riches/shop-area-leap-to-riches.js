import React, { useState, useEffect } from 'react';
import HeaderLeapToRiches from '../header-leap-to-riches/header-leap-to-riches';
import './shop-area-leap-to-riches.css';

function ShopAreaLeapToRiches() {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    fetchPlayerCoins();
  }, []);

  const fetchPlayerCoins = () => {
    fetch('http://localhost:3000/leap-to-riches/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCoins(data.coins))
      .catch(error => console.error('Error fetching player coins:', error));
  };

  const handleBuyClickPowerItem = () => {
    if (coins >= 200) {
      const updatedPlayer = {
        coins: coins - 200,
        store_bought_items: { click_power_item: 'level 2' }
      };

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
          setCoins(coins - 200);
        })
        .catch(error => console.error('Error updating player:', error));
    } else {
      alert('you dont have money!');
    }
  };

  return (
    <div>
      <HeaderLeapToRiches coins={coins} />
      <div className="shop">
        <h2>SHOP</h2>
        <div className="item">
          <p>TEST_LEVEL_2 - LEVEL 2 (COST: 200$)</p>
          <button onClick={handleBuyClickPowerItem}>buy</button>
        </div>
      </div>
    </div>
  );
}

export default ShopAreaLeapToRiches;
