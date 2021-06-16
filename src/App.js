import React, { useState } from "react";

import "./App.scss";
import "./assets/sass/main.scss";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const [isActive, setActive] = useState(false);

  const [isColor, setColor] = useState("#f87070");
  const [isFont, setFont] = useState("Kumbh Sans");

  const [pomo, setPomo] = useState(1500);
  const [shortBreak, setShortBreak] = useState(480);
  const [longBreak, setLongBreak] = useState(6);
  const [startedTime, setStartedTime] = useState(pomo);

  const FULL_DASH_ARRAY = 283;

  // Start with an initial value of 20 seconds
  const TIME_LIMIT = startedTime;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;
  let timerInterval = null;
  // let remainingPathColor = COLOR_CODES.info.color;

  function pauseTime() {
    clearInterval(timerInterval);
  }

  function onTimesUp() {
    clearInterval(timerInterval);
  }

  function startTimer() {
    setActive(true);
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.querySelector(".timer__counter_time").innerHTML = formatTime(
        timeLeft
      );
      setCircleDasharray();

      if (timeLeft === 0) {
        onTimesUp();
      }
    }, 1000);
  }

  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${minutes}:${seconds}`;
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }

  const handleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleTimeSwitcher = (e) => {
    let selectedTime = e.target.value;
    if (selectedTime < 10) {
      setStartedTime(`0${selectedTime}`);
    } else {
      setStartedTime(selectedTime);
    }
  };

  const handleChanges = () => {
    document.documentElement.style.setProperty("--color", isColor);
    document.documentElement.style.setProperty(
      "--font",
      isFont + ", sans-serif"
    );
    const timerAtivo = document.getElementsByName("timerPomo");
    timerAtivo.forEach((timer) => {
      if (timer.checked === true) {
        if (timer.value < 10) {
          setStartedTime(`0${timer.value}`);
        } else {
          setStartedTime(timer.value);
        }
      }
    });
    setPomo(pomo);
    setShortBreak(shortBreak);
    setLongBreak(longBreak);

    setModalOpen(!isModalOpen);
  };

  const handleStart = () => {
    if (isActive) {
      setActive(false);
      pauseTime()

    } else {
      setActive(true)
    }
  }

  return (
    <div className="app">
      <header className="app_header">
        <h2 className="text_2">pomodoro</h2>
      </header>

      <div className="selectors">
        <label className="switcher" onClick={handleTimeSwitcher}>
          <input type="radio" defaultChecked name="timerPomo" value={pomo} />
          <span className="switcher__bg">pomodoro</span>
        </label>
        <label className="switcher" onClick={handleTimeSwitcher}>
          <input type="radio" name="timerPomo" value={shortBreak} />
          <span className="switcher__bg">short break</span>
        </label>
        <label className="switcher" onClick={handleTimeSwitcher}>
          <input type="radio" name="timerPomo" value={longBreak} />
          <span className="switcher__bg">long break</span>
        </label>
      </div>

      <div className="timer">
        <div className="timer_inner base-timer">
          <svg className="base-timer__svg " viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g className="base-timer__circle">
              <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
              <path
                id="base-timer-path-remaining"
                stroke-dasharray="283"
                className="base-timer__path-remaining"
                d="
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0
                "
              ></path>
            </g>
          </svg>


          <div className="timer__counter">
            <p className="text_1 timer__counter_time">{formatTime(timeLeft)}</p>
            {/* <p className="text_1 timer__counter_time">{startedTime}:{second < 10 ? `0${second}` : second}</p> */}

            <button className="timer__action text_3" onClick={startTimer}>Start</button>
            <button className="timer__action text_3" onClick={onTimesUp}>stop</button>
          </div>
        </div>
      </div>

      <button className="settings" onClick={handleModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">
          <path
            fill="#D7E0FF"
            d="M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z"
            opacity=".5"
          />
        </svg>
      </button>

      {/* Modal */}
      <div className={`modal ${isModalOpen ? "open" : ""}`}>
        <div className="modal_inner">
          <div className="modal_header">
            <p className="text_2">Settings</p>
            <svg
              onClick={handleModal}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
            >
              <path
                fill="#1E213F"
                d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
                opacity=".5"
              />
            </svg>
          </div>

          <div className="modal_body">
            <div className="modal_section">
              <p className="text_4">Time (Minutes)</p>
              <ul className="modal__content full_line">
                <li className="list_timer">
                  <small className="text_small">pomodoro</small>
                  <div className="content_time">
                    <input
                      className="content_time__number"
                      type="text"
                      name="pomodoro"
                      id="timer_pomo"
                      readOnly
                      value={pomo}
                    />
                    <div className="content_time__arrows">
                      {/* Arrow UP */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="7"
                        onClick={() => {
                          setPomo(pomo === 60 ? 60 : pomo + 5);
                        }}
                      >
                        <path
                          fill="none"
                          opacity=".25"
                          stroke-width="2"
                          d="M1 6l6-4 6 4"
                        />
                      </svg>
                      {/* Arrow DOWN */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="7"
                        onClick={() => {
                          setPomo(pomo === 0 ? 0 : pomo - 5);
                        }}
                      >
                        <path
                          fill="none"
                          opacity=".25"
                          stroke-width="2"
                          d="M1 1l6 4 6-4"
                        />
                      </svg>
                    </div>
                  </div>
                </li>
                <li className="list_timer">
                  <small className="text_small">short break</small>
                  <div className="content_time">
                    <input
                      className="content_time__number"
                      type="text"
                      name="shortBreak"
                      id="timer_short"
                      readOnly
                      value={shortBreak}
                    />
                    {/* <p className="content_time__number">{shortBreak}</p> */}
                    <div className="content_time__arrows">
                      {/* Arrow UP */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="7"
                        onClick={() => {
                          setShortBreak(
                            shortBreak === 60 ? 60 : shortBreak + 2
                          );
                        }}
                      >
                        <path
                          fill="none"
                          opacity=".25"
                          stroke-width="2"
                          d="M1 6l6-4 6 4"
                        />
                      </svg>
                      {/* Arrow DOWN */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="7"
                        onClick={() => {
                          setShortBreak(shortBreak === 0 ? 0 : shortBreak - 2);
                        }}
                      >
                        <path
                          fill="none"
                          opacity=".25"
                          stroke-width="2"
                          d="M1 1l6 4 6-4"
                        />
                      </svg>
                    </div>
                  </div>
                </li>
                <li className="list_timer">
                  <small className="text_small">long break</small>
                  <div className="content_time">
                    <input
                      className="content_time__number"
                      type="text"
                      name="longBreak"
                      id="timer_long"
                      readOnly
                      value={longBreak}
                    />
                    {/* <p className="content_time__number">{longBreak}</p> */}
                    <div className="content_time__arrows">
                      {/* Arrow UP */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="7"
                        onClick={() => {
                          setLongBreak(longBreak === 60 ? 60 : longBreak + 2);
                        }}
                      >
                        <path
                          fill="none"
                          opacity=".25"
                          stroke-width="2"
                          d="M1 6l6-4 6 4"
                        />
                      </svg>
                      {/* Arrow DOWN */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="7"
                        onClick={() => {
                          setLongBreak(longBreak === 0 ? 0 : longBreak - 2);
                        }}
                      >
                        <path
                          fill="none"
                          opacity=".25"
                          stroke-width="2"
                          d="M1 1l6 4 6-4"
                        />
                      </svg>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="modal_section">
              <p className="text_4">Font</p>
              <ul className="modal__content">
                <li className="list_font">
                  <label
                    className="radio"
                    onClick={() => {
                      setFont("Kumbh Sans");
                    }}
                  >
                    <input type="radio" defaultChecked name="fontSetter" />
                    <span className="checkround">Aa</span>
                  </label>
                </li>
                <li className="list_font">
                  <label
                    className="radio"
                    onClick={() => {
                      setFont("Roboto Slab");
                    }}
                  >
                    <input type="radio" name="fontSetter" />
                    <span className="checkround">Aa</span>
                  </label>
                </li>
                <li className="list_font">
                  <label
                    className="radio"
                    onClick={() => {
                      setFont("Space Mono");
                    }}
                  >
                    <input type="radio" name="fontSetter" />
                    <span className="checkround">Aa</span>
                  </label>
                </li>
              </ul>
            </div>

            <div className="modal_section">
              <p className="text_4">Color</p>
              <ul className="modal__content">
                <li
                  className="list_color active"
                  onClick={() => {
                    setColor("#f87070");
                  }}
                >
                  <label
                    className="radio"
                    onClick={() => {
                      setColor("#f87070");
                    }}
                  >
                    <input type="radio" defaultChecked name="colorSetter" />
                    <span className="checkv red"></span>
                  </label>
                </li>
                <li
                  className="list_color active"
                  onClick={() => {
                    setColor("#70f3f8");
                  }}
                >
                  <label
                    className="radio"
                    onClick={() => {
                      setColor("#70f3f8");
                    }}
                  >
                    <input type="radio" name="colorSetter" />
                    <span className="checkv magenta"></span>
                  </label>
                </li>
                <li
                  className="list_color active"
                  onClick={() => {
                    setColor("#d881f8");
                  }}
                >
                  <label
                    className="radio"
                    onClick={() => {
                      setColor("#d881f8");
                    }}
                  >
                    <input type="radio" name="colorSetter" />
                    <span className="checkv purple"></span>
                  </label>
                </li>
                {/* <li className="list_color"
                  onClick={() => { setColor('#70f3f8') }}></li>
                <li className="list_color"
                  onClick={() => { setColor('#d881f8') }}></li> */}
              </ul>
            </div>

            <button className="btn modal__btn" onClick={handleChanges}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
