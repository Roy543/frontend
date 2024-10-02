import React, { useState } from 'react';
import Question from './components/Question';
import ResponseScreen from './components/ResponseScreen';
import DateScheduler from './components/DateScheduler';
import './App.css';

function App() {
  const [step, setStep] = useState(1);

  const handleYes = () => {
    setStep(2);
  };

  const handleSchedule = () => {
    setStep(3);
  };

  return (
    <div className="App">
      {step === 1 && <Question onYes={handleYes} />}
      {step === 2 && <ResponseScreen onSchedule={handleSchedule} />}
      {step === 3 && <DateScheduler />}
    </div>
  );
}

export default App;
