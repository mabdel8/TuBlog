import React from 'react';
import Posts from './Posts';  // Adjust the path if your file structure is different
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1 id='main-heading'>Welcome back <span id='tiger-heading'>tiger</span>,</h1>
      </header>
      <Posts />
      </div>
      </Router>
  );
}

export default App;
