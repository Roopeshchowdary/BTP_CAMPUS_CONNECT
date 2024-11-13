import React, { useState } from "react";
import "./GoalsModal.css";

const GoalsModal = ({ isOpen, onSave, setOpen }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const handleSelectGoals = (e) => {};

  const handleSave = () => {
    onClose();
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={`goals-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Add your goals</h2>
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. At aliquid
          saepe cupiditate, accusantium corporis modi autem maxime inventore
          magnam minus labore sequi vitae numquam dignissimos sit ut officiis
          error sunt?
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default GoalsModal;
