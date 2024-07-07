import React from 'react';
import './main-playing-area-leap-to-riches.css';

function MainPlayingAreaLeapToRiches({ onCoinClick, clickCount, hasLevel2ClickPower }) {
  const clicksNeededForCoin = hasLevel2ClickPower ? 5 : 30;
  const fillPercentage = (clickCount / clicksNeededForCoin) * 100;

  return (
    <div className="circle-container">
      <div className="circle" onClick={onCoinClick}>
        <div className="fill" style={{ height: `${fillPercentage}%` }}></div>
      </div>
    </div>
  );
}

export default MainPlayingAreaLeapToRiches;