import React from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className='logo'>
          DAMSOT
        </div>
        <div className='mainButtons'>
          <div className='shopButton' onClick={navigateToShop}>Shop</div>
          <div>Your capital</div>
          <div>Settings</div>
          <div>Also</div>
        </div>
        <div className='littleInfoAboutCharacter'>
          <div className='characterMoney'>
            {coins}$
          </div>
          <div className='userNickname'>
            damsot
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderLeapToRiches;