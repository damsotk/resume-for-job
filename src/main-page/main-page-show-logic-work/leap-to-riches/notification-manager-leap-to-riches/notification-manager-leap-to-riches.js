import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './notification-manager-leap-to-riches.css'

Modal.setAppElement('#root');

function NotificationManagerLeapToRiches({ player, updatePlayer }) {
  const [notifications, setNotifications] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    checkForEvents();
  }, [player]);

  const checkForEvents = () => {
    if (player.coins >= 10 && !player.events?.includes('first_earnings')) {
      addNotification({
        id: 'first_earnings',
        message: 'You had the opportunity to earn a little extra. Would you like to participate?',
        options: [
          { text: 'Yes', action: handleFirstEarnings },
          { text: 'No', action: () => {} }
        ]
      });
    }
  };

  const addNotification = (notification) => {
    setNotifications([...notifications, notification]);
    if (!currentNotification) {
      setCurrentNotification(notification);
    }
  };

  const handleFirstEarnings = () => {
    const updatedPlayer = {
      ...player,
      coins: player.coins + 10,
      events: [...(player.events || []), 'first_earnings']
    };
    updatePlayer(updatedPlayer);
    closeNotification();
  };

  const closeNotification = () => {
    setNotifications(notifications.slice(1));
    setCurrentNotification(notifications[1] || null);
  };

  return (
    <div>
      {currentNotification && (
        <Modal
          isOpen={!!currentNotification}
          onRequestClose={closeNotification}
          contentLabel="Notification"
        >
          <h2>Notification</h2>
          <p>{currentNotification.message}</p>
          <div>
            {currentNotification.options.map((option, index) => (
              <button key={index} onClick={option.action}>
                {option.text}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default NotificationManagerLeapToRiches;