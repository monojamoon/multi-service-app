import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function AbbreviationExpander() {
  const [timezoneAbbr, setTimezoneAbbr] = useState('');
  const [timezoneResult, setTimezoneResult] = useState(null);
  const [timezoneError, setTimezoneError] = useState(null);

  const [newAgeAbbr, setNewAgeAbbr] = useState('');
  const [newAgeResult, setNewAgeResult] = useState(null);
  const [newAgeError, setNewAgeError] = useState(null);

  const expandTimezone = async () => {
    setTimezoneError(null);
    setTimezoneResult(null);

    if (!timezoneAbbr) {
      setTimezoneError('Please enter a timezone abbreviation');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/abbreviation/time_zones`, {
        abbreviation: timezoneAbbr
      });

      if (response.data.success) {
        setTimezoneResult({
          abbreviation: response.data.abbreviation,
          expansion: response.data.expansion
        });
      }
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.available) {
        setTimezoneError(
          `"${timezoneAbbr}" not found. Available: ${errorData.available.join(', ')}`
        );
      } else {
        setTimezoneError(errorData?.error || 'An error occurred');
      }
    }
  };

  const expandNewAge = async () => {
    setNewAgeError(null);
    setNewAgeResult(null);

    if (!newAgeAbbr) {
      setNewAgeError('Please enter an abbreviation');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/abbreviation/new_age_expansions`, {
        abbreviation: newAgeAbbr
      });

      if (response.data.success) {
        setNewAgeResult({
          abbreviation: response.data.abbreviation,
          expansion: response.data.expansion
        });
      }
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.available) {
        setNewAgeError(
          `"${newAgeAbbr}" not found. Available: ${errorData.available.join(', ')}`
        );
      } else {
        setNewAgeError(errorData?.error || 'An error occurred');
      }
    }
  };

  return (
    <div className="service-card">
      <h2>Abbreviation Expander</h2>
      
      <div className="service-section">
        <h3>Timezone Abbreviations</h3>
        <div className="input-group">
          <label htmlFor="timezone">Timezone Abbreviation</label>
          <input
            id="timezone"
            type="text"
            value={timezoneAbbr}
            onChange={(e) => setTimezoneAbbr(e.target.value)}
            placeholder="e.g., MST, EST, PST"
          />
        </div>
        <button className="action-btn" onClick={expandTimezone}>
          Expand Timezone
        </button>

        {timezoneResult && (
          <div className="result-box success">
            <p><strong>{timezoneResult.abbreviation}</strong> stands for:</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {timezoneResult.expansion}
            </p>
          </div>
        )}

        {timezoneError && (
          <div className="result-box error">
            <p><strong>Error:</strong> {timezoneError}</p>
          </div>
        )}
      </div>

      <div className="service-section">
        <h3>New Age Abbreviations</h3>
        <div className="input-group">
          <label htmlFor="newage">New Age Abbreviation</label>
          <input
            id="newage"
            type="text"
            value={newAgeAbbr}
            onChange={(e) => setNewAgeAbbr(e.target.value)}
            placeholder="e.g., LOL, BRB, OMG"
          />
        </div>
        <button className="action-btn" onClick={expandNewAge}>
          Expand Abbreviation
        </button>

        {newAgeResult && (
          <div className="result-box success">
            <p><strong>{newAgeResult.abbreviation}</strong> stands for:</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {newAgeResult.expansion}
            </p>
          </div>
        )}

        {newAgeError && (
          <div className="result-box error">
            <p><strong>Error:</strong> {newAgeError}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AbbreviationExpander;
