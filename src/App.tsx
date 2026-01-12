import React from 'react'

function App(){ 
  return (
  <div className="container">

    <div className='chat-header'>
      <div className='header-info'>
        <h2 className='logo-text'>Chatbot</h2>
      </div>
    </div>

    <div className="chat-body">
      <div className="message bot-message">
        <p className="message-text"> Hello, I am a chatbot. At your service.</p>
      </div>
      <div className="message user-message">
        <p className="message-text"> customer is king, user is king.</p>
      </div>
    </div>
  
    <div className="chat-footer"></div>
      <form action="#" className='chat-form'>
        <input type="text" placeholder="Enter your message..." className="message-input" required/>
        <button></button>      
      </form>
  </div>
  );
};

export default App