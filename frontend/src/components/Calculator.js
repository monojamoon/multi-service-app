import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const performOperation = async (operation) => {
    setError(null);
    setResult(null);

    if (!num1 || !num2) {
      setError('Please enter both numbers');
      return;
    }

    try {
      const endpoint = operation === 'add' 
        ? `${API_BASE_URL}/api/calculator/add`
        : `${API_BASE_URL}/api/calculator/subtract`;

      const response = await axios.post(endpoint, {
        num1: parseFloat(num1),
        num2: parseFloat(num2)
      });

      if (response.data.success) {
        setResult({
          operation: operation === 'add' ? 'Addition' : 'Subtraction',
          value: response.data.result
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="service-card">
      <h2>Calculator Service</h2>
      
      <div className="service-section">
        <div className="input-group">
          <label htmlFor="num1">First Number</label>
          <input
            id="num1"
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Enter first number"
          />
        </div>

        <div className="input-group">
          <label htmlFor="num2">Second Number</label>
          <input
            id="num2"
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Enter second number"
          />
        </div>

        <div className="operations-grid">
          <button className="action-btn" onClick={() => performOperation('add')}>
            Add (+)
          </button>
          <button className="action-btn" onClick={() => performOperation('subtract')}>
            Subtract (-)
          </button>
        </div>

        {result && (
          <div className="result-box success">
            <p><strong>{result.operation} Result:</strong></p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{result.value}</p>
          </div>
        )}

        {error && (
          <div className="result-box error">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;
