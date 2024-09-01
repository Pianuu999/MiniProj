import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [weather, setWeather] = useState(null);
  const [activeTodoIndex, setActiveTodoIndex] = useState(null);
  const [timer, setTimer] = useState(0);
  const [completedTimes, setCompletedTimes] = useState({}); // 할 일에 대한 완료된 시간

  const API_KEY = '8ecba14b7d03ec44a0f3b6810fd64de8';
  const CITY = 'Seoul, KR';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch();
        const data = await response.json();
        if (data.main && data.weather) {
          setWeather(data);
        } else {
          console.error("Unexpected API response structure", data);
        }
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    fetchWeather();
  }, [API_KEY, CITY]);

  useEffect(() => {
    let interval = null;
    if (activeTodoIndex !== null) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [activeTodoIndex]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setCompletedTimes((prevTimes) => {
      const newTimes = { ...prevTimes };
      delete newTimes[index];
      return newTimes;
    });
  };

  const editTodo = (index) => {
    setInput(todos[index]);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const saveTodo = () => {
    if (input.trim()) {
      const newTodos = [...todos];
      newTodos[currentIndex] = input;
      setTodos(newTodos);
      setInput('');
      setIsEditing(false);
      setCurrentIndex(null);
    }
  };

  const handleTodoClick = (index) => {
    if (activeTodoIndex === index) {
      // 할 일을 완료하면 타이머를 멈추고 시간을 기록
      setCompletedTimes((prevTimes) => ({
        ...prevTimes,
        [index]: (prevTimes[index] || 0) + timer,
      }));
      setActiveTodoIndex(null);
      setTimer(0);
    } else {
      setActiveTodoIndex(index);
      setTimer(0);
    }
  };

  const data = {
    labels: todos,
    datasets: [
      {
        label: 'Time spent (seconds)',
        data: todos.map((_, index) => completedTimes[index] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.Appwrapper}>
      <div className={styles.App}>
        <div className={styles.logo}>
          <h1>JUST <br></br>DO IT</h1>
        </div>
        <h1>Todo List</h1>
        <div className={styles.winfo}>
          {weather && (
            <>
              <img
                className={styles.wicon}
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="weather-icon"
              />
              <p>{Math.round(weather.main.temp)}°C</p>
            </>
          )}
        </div>
        <div className={styles.inputcontainer}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="새 할일을 추가하세요."
          />
          {isEditing ? (
            <button onClick={saveTodo}>
              <FontAwesomeIcon icon={faEdit} /> Save
            </button>
          ) : (
            <button onClick={addTodo}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          )}
        </div>
        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              onClick={() => handleTodoClick(index)}
              className={activeTodoIndex === index ? 'active' : ''}
            >
              <span>{todo}</span>
              {activeTodoIndex === index && (
                <span className="timer">{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</span>
              )}
              <div className={styles.buttoncontainer}>
                <button onClick={(e) => { e.stopPropagation(); editTodo(index); }} className={styles.editbutton}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button onClick={(e) => { e.stopPropagation(); deleteTodo(index); }} className={styles.deletebutton}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
                {activeTodoIndex === index && (
                  <button onClick={(e) => { e.stopPropagation(); handleTodoClick(index); }} className={styles.completebutton}>
                    <FontAwesomeIcon icon={faCheck} /> Complete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.chartcontainer}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default todo;
