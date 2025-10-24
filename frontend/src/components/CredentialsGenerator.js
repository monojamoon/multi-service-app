import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function CredentialsGenerator() {
  // Username state
  const [usernameLength, setUsernameLength] = useState(8);
  const [usernamePrefix, setUsernamePrefix] = useState('');
  const [includeNumbersUsername, setIncludeNumbersUsername] = useState(true);
  const [includeSpecialUsername, setIncludeSpecialUsername] = useState(false);
  const [generatedUsername, setGeneratedUsername] = useState(null);
  const [usernameError, setUsernameError] = useState(null);

  // Password state
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbersPassword, setIncludeNumbersPassword] = useState(true);
  const [includeSpecialPassword, setIncludeSpecialPassword] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const generateUsername = async () => {
    setUsernameError(null);
    setGeneratedUsername(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/credentials_generator/generate_username`, {
        length: parseInt(usernameLength),
        prefix: usernamePrefix,
        include_numbers: includeNumbersUsername,
        include_special: includeSpecialUsername
      });

      if (response.data.success) {
        setGeneratedUsername(response.data.username);
      }
    } catch (err) {
      setUsernameError(err.response?.data?.error || 'An error occurred');
    }
  };

  const generatePassword = async () => {
    setPasswordError(null);
    setGeneratedPassword(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/credentials_generator/generate_password`, {
        length: parseInt(passwordLength),
        include_uppercase: includeUppercase,
        include_lowercase: includeLowercase,
        include_numbers: includeNumbersPassword,
        include_special: includeSpecialPassword
      });

      if (response.data.success) {
        setGeneratedPassword(response.data.password);
      }
    } catch (err) {
      setPasswordError(err.response?.data?.error || 'An error occurred');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="service-card">
      <h2>Credentials Generator</h2>
      
      <div className="service-section">
        <h3>Username Generator</h3>
        
        <div className="input-group">
          <label htmlFor="username-length">Length: {usernameLength}</label>
          <input
            id="username-length"
            type="number"
            min="3"
            max="50"
            value={usernameLength}
            onChange={(e) => setUsernameLength(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="username-prefix">Prefix (optional)</label>
          <input
            id="username-prefix"
            type="text"
            value={usernamePrefix}
            onChange={(e) => setUsernamePrefix(e.target.value)}
            placeholder="e.g., user_"
          />
        </div>

        <div className="checkbox-group">
          <input
            id="username-numbers"
            type="checkbox"
            checked={includeNumbersUsername}
            onChange={(e) => setIncludeNumbersUsername(e.target.checked)}
          />
          <label htmlFor="username-numbers">Include Numbers</label>
        </div>

        <div className="checkbox-group">
          <input
            id="username-special"
            type="checkbox"
            checked={includeSpecialUsername}
            onChange={(e) => setIncludeSpecialUsername(e.target.checked)}
          />
          <label htmlFor="username-special">Include Special Characters (_ -)</label>
        </div>

        <button className="action-btn" onClick={generateUsername}>
          Generate Username
        </button>

        {generatedUsername && (
          <div className="result-box success">
            <p><strong>Generated Username:</strong></p>
            <p style={{ 
              fontSize: '1.3rem', 
              fontWeight: 'bold', 
              fontFamily: 'monospace',
              wordBreak: 'break-all'
            }}>
              {generatedUsername}
            </p>
            <button 
              className="action-btn" 
              onClick={() => copyToClipboard(generatedUsername)}
              style={{ marginTop: '0.5rem' }}
            >
              Copy to Clipboard
            </button>
          </div>
        )}

        {usernameError && (
          <div className="result-box error">
            <p><strong>Error:</strong> {usernameError}</p>
          </div>
        )}
      </div>

      <div className="service-section">
        <h3>Password Generator</h3>
        
        <div className="input-group">
          <label htmlFor="password-length">Length: {passwordLength}</label>
          <input
            id="password-length"
            type="number"
            min="4"
            max="100"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>

        <div className="checkbox-group">
          <input
            id="password-uppercase"
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          <label htmlFor="password-uppercase">Include Uppercase (A-Z)</label>
        </div>

        <div className="checkbox-group">
          <input
            id="password-lowercase"
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          <label htmlFor="password-lowercase">Include Lowercase (a-z)</label>
        </div>

        <div className="checkbox-group">
          <input
            id="password-numbers"
            type="checkbox"
            checked={includeNumbersPassword}
            onChange={(e) => setIncludeNumbersPassword(e.target.checked)}
          />
          <label htmlFor="password-numbers">Include Numbers (0-9)</label>
        </div>

        <div className="checkbox-group">
          <input
            id="password-special"
            type="checkbox"
            checked={includeSpecialPassword}
            onChange={(e) => setIncludeSpecialPassword(e.target.checked)}
          />
          <label htmlFor="password-special">Include Special Characters</label>
        </div>

        <button className="action-btn" onClick={generatePassword}>
          Generate Password
        </button>

        {generatedPassword && (
          <div className="result-box success">
            <p><strong>Generated Password:</strong></p>
            <p style={{ 
              fontSize: '1.3rem', 
              fontWeight: 'bold', 
              fontFamily: 'monospace',
              wordBreak: 'break-all'
            }}>
              {generatedPassword}
            </p>
            <button 
              className="action-btn" 
              onClick={() => copyToClipboard(generatedPassword)}
              style={{ marginTop: '0.5rem' }}
            >
              Copy to Clipboard
            </button>
          </div>
        )}

        {passwordError && (
          <div className="result-box error">
            <p><strong>Error:</strong> {passwordError}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CredentialsGenerator;
