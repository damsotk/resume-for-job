import React from 'react';
import { useNavigate } from 'react-router-dom';
import iconForShop from './icons-for-game/icons8-shopping-cart-48.png';
import iconForAllCompanies from './icons-for-game/icons8-stock-64.png';
import iconForProfile from './icons-for-game/icons8-test-account-48.png';
import iconForFame from './icons-for-game/icons8-hollywood-stars-48.png';
import iconForPassiveIncome from './icons-for-game/icons8-bitcoin-wallet-64.png';
import './header-leap-to-riches.css';

function HeaderLeapToRiches({ coins, permissions }) {
  const navigate = useNavigate();

  const navigateToShop = () => {
    if (permissions.store_access) {
      navigate('/leap-to-riches/shop-area', { state: { coins } });
    } else {
      alert('You do not have permission to access the shop.');
    }
  };

  return (
    <div>
      <div className='navForGame'>
        <div className='stats'>
          <div className='userCash'>
            <div className='money'>$ {coins}</div>
            <div className='income'>(+0)</div>
          </div>
          <div className='fame'>
            <img src={iconForFame} alt="Fame" />
            <div>0</div>
          </div>
          <div className='passiveIncome'>
            <img src={iconForPassiveIncome} alt="Passive Income" />
            <div>0</div>
          </div>
        </div>
        <div className='mainButtons'>
          <div onClick={navigateToShop}>
            shop
          </div>
          <div>
            all companies
          </div>
          <div>
            all stats
          </div>
        </div>
        <div className='littleInfoAboutCharacter'>
          <div className='characterMoney'>
            damsot
          </div>
          <div className='userProfile'>
            <img src={iconForProfile} alt="Profile" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderLeapToRiches;