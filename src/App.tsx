//import React from 'react'
import './App.css'
import { Chatbot } from './components/Chatbot'
import { DocumentUploader } from './components/DocumentUploader'

function App(){ 
  return (
    <div className="app-layout">
      <DocumentUploader />
      <Chatbot />
    </div>
  );
};

export default App