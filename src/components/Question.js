import React from 'react';

function Question({ question, selected, onSelectAnswer }) {
  if (!question) {
    return <div className="error">Question not found</div>;
  }

  const { id, text, options } = question;

  return (
    <div style={{ marginBottom: '30px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '1.3rem', color: '#333' }}>
        {text}
      </h2>
      <fieldset style={{ border: 'none', padding: 0 }}>
        <legend style={{ display: 'none' }}>Select an answer</legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Array.isArray(options) && options.map((option, index) => (
            <label
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: selected === option ? '#f0f4ff' : 'white',
                borderColor: selected === option ? '#667eea' : '#e0e0e0',
                transition: 'all 0.2s ease'
              }}
            >
              <input
                type="radio"
                name={`question-${id}`}
                value={option}
                checked={selected === option}
                onChange={() => onSelectAnswer(option)}
                style={{ marginRight: '12px', cursor: 'pointer' }}
                aria-label={`Answer option: ${option}`}
              />
              <span style={{ flex: 1, color: '#333' }}>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default Question;