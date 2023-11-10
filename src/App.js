import React, { useState, useEffect } from 'react';
import sadImage from './images/sad.png';
import happyImage from './images/Happy.png';
import neutralImage from './images/Neutral.png';
import veryHappyImage from './images/veryHappy.png';
import extremelySadImage from './images/verySad.png';
import Title from './images/banner.jpeg';
import download from './images/download1.png';
import deleteimg from './images/delete.png'
import './App.css'



function App() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [showThanksMessage, setShowThanksMessage] = useState(false);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    console.log(selectedEmoji);
  };

  const handleSubmit = () => {
    const feedbackData = localStorage.getItem('feedback');
    if (selectedEmoji) {
      if (feedbackData) {


        // Get the existing feedback data from localStorage
        const existingFeedback = JSON.parse(localStorage.getItem('feedback')) || [];

        // Add the new feedback to the existing data
        existingFeedback.push(selectedEmoji);
      
      // Store the updated feedback array in localStorage
      localStorage.setItem('feedback', JSON.stringify(existingFeedback));

      console.log(`Selected Emoji: ${selectedEmoji}`);
      }
      else{
        localStorage.setItem('feedback', JSON.stringify([selectedEmoji]));
      }
      setShowThanksMessage(true);

      // After 3 seconds, reset the UI
      setTimeout(() => {
        setShowThanksMessage(false);
        setSelectedEmoji(null);
      }, 3000);
    } else {
      alert('Please select an emoji before submitting.');
    }
  };

  const handleDownload = () => {
    const feedbackData = localStorage.getItem('feedback');

    if (feedbackData) {
      // Get the existing feedback data from localStorage
      const existingFeedback = JSON.parse(localStorage.getItem('feedback')) || [];

      // Create a CSV file content
      const csvContent = 'Index,Feedback\n' + existingFeedback.map((feedback, index) => `${index + 1},${feedback}`).join('\n');

      // Create a Blob with the CSV content
      const blob = new Blob([csvContent], { type: 'text/csv' });

      // Create a download link and trigger the download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'feedback.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
    else {
      alert('No feedback data found.');
    }

  };
  const handleDelete = () => {
    const confirmation = window.confirm('Are you sure you want to delete all feedback data?');
    if (confirmation) {
      
   
    // Clear the values of the "feedback" key in localStorage
    localStorage.setItem('feedback', '');
    // Reset the UI by clearing the selected emoji and thanks message
    setSelectedEmoji(null);
    setShowThanksMessage(false); }
  };

  return (
    <div className="App">
      <div style={{ backgroundColor: 'black', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '5%', paddingRight: '10px' }}>
        <img height={100} src={Title} /><div style={{ display: 'flex', alignItems: 'center', }}>
          <div style={{ marginLeft: 'auto', cursor: 'pointer', paddingRight: '20px' }} >
            <img src={deleteimg} width={55} height={55} onClick={handleDelete} />
          </div>
          <div style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={handleDownload}>
            <img src={download} width={60} height={60} />
          </div></div>
      </div>
      {showThanksMessage ?null:<div className='question'>What are your thoughts on Sodalicious?</div>}
      {showThanksMessage ? <div className="thanks-message">Thanks for your feedback !</div> :
        <div className="emoji-container">

          <img
            width={100}
            className={`emoji ${selectedEmoji === 'extremely-sad' ? 'selected' : ''}`}
            src={extremelySadImage}
            alt="Extremely Sad"
            onClick={() => handleEmojiClick('extremely-sad')}
          />

          <img
            width={100}
            className={`emoji ${selectedEmoji === 'sad' ? 'selected' : ''}`}
            src={sadImage}
            alt="Sad"
            onClick={() => handleEmojiClick('sad')}
          />
          <img
            width={100}
            className={`emoji ${selectedEmoji === 'neutral' ? 'selected' : ''}`}
            src={neutralImage}
            alt="Neutral"
            onClick={() => handleEmojiClick('neutral')}
          />
          <img
            width={100}
            className={`emoji ${selectedEmoji === 'happy' ? 'selected' : ''}`}
            src={happyImage}
            alt="Happy"
            onClick={() => handleEmojiClick('happy')}
          />
          <img
            width={100}
            className={`emoji ${selectedEmoji === 'very-happy' ? 'selected' : ''}`}
            src={veryHappyImage}
            alt="Very Happy"
            onClick={() => handleEmojiClick('very-happy')}
          />
        </div>}
      {showThanksMessage ? null : <div className='submitButton'><button onClick={handleSubmit} className='button' >Submit</button></div>}

    </div>
  );
}

export default App;
