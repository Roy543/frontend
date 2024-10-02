import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [email, setEmail] = useState('');
  const yourEmail = 'sahilsas88@gmail.com'; // Replace with your email address

  const sendInviteToBackend = async (eventDetails) => {
    try {
      const response = await fetch('https://backend-three-gray.vercel.app/api/send-invite', { // Update this URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });
  
      if (response.ok) {
        alert('Calendar invite sent successfully!');
      } else {
        alert('Failed to send calendar invite. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error(error);
    }
  };  

  const handleSchedule = () => {
    if (selectedDate && email) {
      fetch('https://backend-three-gray.vercel.app/send-invite', { // Use your local IP here
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate.toISOString(), // Ensure the date is in ISO format
          userEmail: email
        })
      })
      .then(async (response) => {
        const text = await response.text(); // Get the response as text
        if (response.ok) {
          alert('Date scheduled successfully! Check your inbox for the invite.');
        } else {
          // Log the text to see the error message returned from the server
          console.error('Error response:', text);
          alert(`Failed to schedule the date: ${text}`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to schedule the date, please try again.');
      });
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
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
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