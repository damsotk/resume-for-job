import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './to-do-list.css';
import useBallsAnimation from '../../hooks/useBallsAnimation';

const Modal = ({ isOpen, affair, onClose, onSave }) => {
  const [editedAffair, setEditedAffair] = useState({ ...affair });

  useEffect(() => {
    setEditedAffair({ ...affair });
  }, [affair]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAffair({ ...editedAffair, [name]: value });
  };

  const handleSave = () => {
    onSave({
      ...editedAffair,
      tags: editedAffair.tags.split(',').map(tag => tag.trim())
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Affair</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={editedAffair.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={editedAffair.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="end_time"
          placeholder="End Time"
          value={editedAffair.end_time}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={editedAffair.tags}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

function ToDoList() {
  const [affairs, setAffairs] = useState([]);
  const [newAffair, setNewAffair] = useState({
    name: '',
    description: '',
    end_time: '',
    tags: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAffair, setCurrentAffair] = useState(null);
  const balls = useBallsAnimation();


  useEffect(() => {
    axios.get('http://localhost:5000/daily_affairs')
      .then(response => {
        const fetchedAffairs = response.data.map(affair => ({
          ...affair,
          tags: Array.isArray(affair.tags) ? affair.tags : affair.tags.split(',').map(tag => tag.trim())
        }));
        setAffairs(fetchedAffairs);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddAffair = () => {
    if (!newAffair.name.trim()) return;

    const affairToAdd = {
      id: String(affairs.length + 1),
      ...newAffair,
      tags: newAffair.tags.split(',').map(tag => tag.trim())
    };

    axios.post('http://localhost:5000/daily_affairs', affairToAdd)
      .then(response => {
        setAffairs([...affairs, response.data]);
        setNewAffair({
          name: '',
          description: '',
          end_time: '',
          tags: ''
        });
      })
      .catch(error => console.error('Error adding affair:', error));
  };

  const handleDeleteAffair = (id) => {
    axios.delete(`http://localhost:5000/daily_affairs/${id}`)
      .then(() => {
        setAffairs(affairs.filter(affair => affair.id !== id));
      })
      .catch(error => console.error('Error deleting affair:', error));
  };

  const openModal = (affair) => {
    setCurrentAffair(affair);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAffair(null);
  };

  const saveChanges = (editedAffair) => {
    axios.put(`http://localhost:5000/daily_affairs/${editedAffair.id}`, editedAffair)
      .then(response => {
        setAffairs(affairs.map(affair => affair.id === editedAffair.id ? response.data : affair));
        closeModal();
      })
      .catch(error => console.error('Error updating affair:', error));
  };

  return (
    <div className='background'>
      <div className='containerForBalls'></div>
      <div className='header'>
        <div className='logo'>
          damsot
        </div>
        <div className='selectMode'>Daily Affairs</div>
      </div>
      <div className='menuForNavToDoList'>
        <div className='buttonForNavToDoList'>daily affairs</div>
        <div className='buttonForNavToDoList'>week affairs</div>
        <div className='buttonForNavToDoList'>year affairs</div>
        <div className='buttonForNavToDoList'>finish affairs</div>
      </div>
      <div className='flexForInputsDailyAffairs'>
        <input
          type="text"
          placeholder="Name"
          value={newAffair.name}
          onChange={(e) => setNewAffair({ ...newAffair, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newAffair.description}
          onChange={(e) => setNewAffair({ ...newAffair, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="End Time"
          value={newAffair.end_time}
          onChange={(e) => setNewAffair({ ...newAffair, end_time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={newAffair.tags}
          onChange={(e) => setNewAffair({ ...newAffair, tags: e.target.value })}
        />
        <div className='buttonForToDo' onClick={handleAddAffair}>Add Affair</div>
      </div>
      <div className='cardsContainerDaily'>
        {affairs.map(affair => (
          <div key={affair.id} className='cardDailyAffair'>
            <div className='headCardForDailyAffair'>
              <div className='affairName'>{affair.name}</div>
              <div>{affair.end_time}</div>
            </div>
            <div className='descDailyAffairCard'>{affair.description}</div>
            <div className='tagsDailyAffairCard'>{Array.isArray(affair.tags) ? affair.tags.join(', ') : affair.tags}</div>
            <div className='settingsDailyAffairCard'>
              <div className='buttonForAffairs' onClick={() => handleDeleteAffair(affair.id)}>Delete</div>
              <div className='buttonForAffairs' onClick={() => openModal(affair)}>Edit</div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        affair={currentAffair}
        onClose={closeModal}
        onSave={saveChanges}
      />
    </div>
  );
}

export default ToDoList;