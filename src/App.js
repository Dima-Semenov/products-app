import React, { useState } from 'react';
import './App.scss';
import { CurrentGood } from './Components/CurrentGood/CurrentGood.jsx';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

function App() {
  const [query, setQuery] = useState('');
  const [listOfGoods, setListOfGoods] = useLocalStorage('goods' ,[]);
  const [priority, setPriority] = useState(1);

  //comment

  const handleSubmit = (event) => {
    event.preventDefault()

    if (query.length) {
      setListOfGoods(prevState => [({
        id: Math.random(),
        name: query,
        priority: +priority,
        complete: false,
      }),
      ...prevState,
      ])
      setQuery('');
      setPriority(1);
    }
  }

  const handleChange = (event) => {
    setQuery(event.target.value);
  }

  const handleClick = (id) => {
    setListOfGoods([...listOfGoods].filter(good => (
        good.id !== id
      ))
    )
  }
  
  const filterByStatus = () => {
    setListOfGoods([...listOfGoods].sort((good1, good2) => (
      good1.priority - good2.priority
    )))
  }

  const filterByName = () => {
    setListOfGoods([...listOfGoods].sort((good1, good2) => (
      good1.name.localeCompare(good2.name)
    )))
  }

  const handleStatusChange = (id) => {
    setListOfGoods(prevState => prevState.map(good => {
      if (good.id !== id) {
        return good;
      }

      return ({
        ...good,
        complete: !good.complete,
      })
    }))
  }

  return (
    <div className="app">

      <div className='app__buttons'>
        <button
          type="button"
          onClick={filterByStatus}
          className="app__button"
        >
          Filter by status
        </button>
        <button
          type="button"
          className="app__button"
          onClick={filterByName}
        >
          Filter by name
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="app__input"
          placeholder="Name product"
          required
        />
        <select
          value={priority}
          className="app__select"
          onChange={(event) => {
          setPriority(event.target.value)}
          }
        >
          <option value='5'>5</option>
          <option value='4'>4</option>
          <option value='3'>3</option>
          <option value='2'>2</option>
          <option value='1'>1</option>
        </select>
        <button
          type='submit'
          className="app__button"
        >
          Add
        </button>
      </form>

      {
        listOfGoods.map(good => (
          <CurrentGood
            key={good.id}
            good={good}
            handleClick={(id) => handleClick(id)}
            handleStatusChange={(id) => handleStatusChange(id)}
          />
        ))
      }

    </div>
  );
}

export default App;
