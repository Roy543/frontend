import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [email, setEmail] = useState('');
  const yourEmail = 'sahilsas88@gmail.com'; // Your email address

  const handleSchedule = async () => {
    if (selectedDate && email) {
      try {
        const response = await fetch('http://localhost:5000/send-invite', { // Update this URL when deploying
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            date: selectedDate.toISOString(), // Ensure the date is in ISO format
            userEmail: email
          }),
        });

        const text = await response.text(); // Get the response as text
        if (response.ok) {
          alert('Date scheduled successfully! Check your inbox for the invite.');
        } else {
          // Log the text to see the error message returned from the server
          console.error('Error response:', text);
          alert(`Failed to schedule the date: ${text}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to schedule the date, please try again.');
      }
    } else {
      alert('Please select a date and enter your email.');
    }
  };

  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '50px',
        padding: '0 10px',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2>Choose a date and time for our date:</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showTimeSelect
        dateFormat="Pp"
        placeholderText="Select date and time"
        className="date-picker"
      />
      <br />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginTop: '20px', padding: '10px', fontSize: '16px', width: '80%' }}
      />
      <br />
      <button
        onClick={handleSchedule}
        className="yes-button"
        style={{ width: '100%', padding: '15px', fontSize: '16px' }} // Full width for better mobile interaction
      >
        Schedule Date
      </button>
    </div>
  );
};

export default DateScheduler;
