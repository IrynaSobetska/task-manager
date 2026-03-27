import React from "react";
import "./Views.css";
import { useState } from "react";

const Month = () => {
  let date = new Date();
  const day = date.getDate();

  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const start = new Date(year, month, 0).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let days = [];

  for (let i = start; i > 0; i--) {
    days.push(<li className="g-day">{endDatePrev - i + 1}</li>);
  }

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  for (let i = 1; i <= endDate; i++) {
    if (currentYear == year && currentMonth == month && i == day) {
      days.push(<li className="today">{i}</li>);
    } else {
      days.push(<li>{i}</li>);
    }
  }

  let currentVal = 0;

  for (let i = end; i < 7; i++) {
    days.push(<li className="g-day">{i - end + 1}</li>);
    currentVal = i - end + 2;
  }

  while (days.length <= 7 * 6 - 1) {
    days.push(<li className="g-day">{currentVal++}</li>);
  }

  return (
    <div>
      <div className="calendar">
        <header>
          <nav className="btn-cont">
            <button
              id="prev"
              onClick={() => {
                if (month === 0) {
                  setYear(year - 1);
                  setMonth(11);
                } else {
                  setMonth(month - 1);
                }
              }}
            >
              &lt;
            </button>
            <button
              id="next"
              onClick={() => {
                if (month === 11) {
                  setYear(year + 1);
                  setMonth(0);
                } else {
                  setMonth(month + 1);
                }
              }}
            >
              &gt;
            </button>
          </nav>
          <h3>
            {months[month]} {year}
          </h3>
        </header>
        <section>
          <ul className="days">
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
            <li>Sun</li>
          </ul>
          <ul className="dates">
            {days.map((item, index) => (
              <div className="date" key={index}>
                {item}
                <div></div>
              </div>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Month;
