import React, { useState } from 'react';
import './App.css';
import Calculator from './components/Calculator';
import AbbreviationExpander from './components/AbbreviationExpander';
import CredentialsGenerator from './components/CredentialsGenerator';

function App() {
  const [activeService, setActiveService] = useState('calculator');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Multi-Service Application</h1>
        <p>Your all-in-one tool for calculations, abbreviations, and credentials</p>
      </header>

      <nav className="service-nav">
        <button
          className={activeService === 'calculator' ? 'active' : ''}
          onClick={() => setActiveService('calculator')}
        >
          Calculator
        </button>
        <button
          className={activeService === 'abbreviation' ? 'active' : ''}
          onClick={() => setActiveService('abbreviation')}
        >
          Abbreviation Expander
        </button>
        <button
          className={activeService === 'credentials' ? 'active' : ''}
          onClick={() => setActiveService('credentials')}
        >
          Credentials Generator
        </button>
      </nav>

      <main className="service-container">
        {activeService === 'calculator' && <Calculator />}
        {activeService === 'abbreviation' && <AbbreviationExpander />}
        {activeService === 'credentials' && <CredentialsGenerator />}
      </main>

      <footer className="App-footer">
        <p>Built with React, Flask, and Docker</p>
      </footer>
    </div>
  );
}

export default App;
