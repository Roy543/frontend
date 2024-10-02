import React, { useState, useEffect, useRef } from 'react';
import './Question.css';

const Question = ({ onYes }) => {
  const [buttonPosition, setButtonPosition] = useState({ top: '50%', left: '65%' });
  const [isInitialPosition, setIsInitialPosition] = useState(true);
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      // Recalculate positions if required during resizing
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMoveNoButton = () => {
    if (isInitialPosition) {
      setIsInitialPosition(false);
    }

    let randomTop, randomLeft;
    let overlap = true;

    while (overlap) {
      // Generate random positions for the "No" button within bounds of the container
      randomTop = Math.floor(Math.random() * 80) + 10 + '%';
      randomLeft = Math.floor(Math.random() * 80) + 10 + '%';

      if (yesButtonRef.current && noButtonRef.current) {
        const yesButtonRect = yesButtonRef.current.getBoundingClientRect();
        const newNoButtonTop = (parseFloat(randomTop) / 100) * window.innerHeight;
        const newNoButtonLeft = (parseFloat(randomLeft) / 100) * window.innerWidth;

        // Calculate the distance between the center of the "Yes" button and the new "No" button position
        const yesButtonCenterX = yesButtonRect.left + yesButtonRect.width / 2;
        const yesButtonCenterY = yesButtonRect.top + yesButtonRect.height / 2;

        const distance = Math.sqrt(
          Math.pow(newNoButtonLeft - yesButtonCenterX, 2) +
          Math.pow(newNoButtonTop - yesButtonCenterY, 2)
        );

        // Set overlap to false if the distance is greater than a threshold value (avoid overlap)
        overlap = distance < 150; // Ensure a minimum distance of 150px between the buttons
      }
    }

    setButtonPosition({ top: randomTop, left: randomLeft });
  };

  return (
    <div className="question-container">
      <h1>Will you go out with me?</h1>
      <div className="buttons">
        <button ref={yesButtonRef} onClick={onYes} className="yes-button">
          Yes
        </button>
        <button
          ref={noButtonRef}
          style={
            isInitialPosition
              ? { position: 'absolute', top: '50%', left: '65%' }
              : {
                  position: 'absolute',
                  top: buttonPosition.top,
                  left: buttonPosition.left,
                  transform: 'translate(-50%, -50%)',
                }
          }
          onMouseEnter={handleMoveNoButton} // Change from onMouseOver to onMouseEnter
          onTouchStart={handleMoveNoButton}
          className="no-button"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Question;
