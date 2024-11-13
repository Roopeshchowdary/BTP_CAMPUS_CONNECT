import React, { useState } from "react";
import "./InterestsModal.css";

const InterestsModal = ({ isOpen, onSave, setOpen }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const handleSelectInterest = (e) => {};

  const handleSave = () => {
    onClose();
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={`interests-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Add your goals</h2>
        <div>
          <li>coding</li>
          <li>ml</li>
          <li>data</li>
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default InterestsModal;
