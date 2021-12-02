import React from 'react';
import './currentGood.scss';

export const CurrentGood = ({good, handleClick, handleStatusChange }) => {

  return (
    <div className={`good ${good.complete ? 'good__complete' : ''}`}>
      <div>
        <input
          type="checkbox"
          onChange={() => handleStatusChange(good.id)}
          checked={good.complete}
          className="good__input"
        />
        {/* comment */}
      </div>
      <div className="good__info" >
        <h1 className="good__title">{good.name}</h1>
        <p>Priority: {good.priority}</p>
        <p>Status: {good.complete ? 'Completed' : 'Active'}</p>
        <button
          type="button"
          onClick={() => handleClick(good.id)}
        >
          delete
        </button>
      </div>
    </div>
  );
}