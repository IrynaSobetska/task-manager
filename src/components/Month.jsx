import React from "react";
import "./Views.css";
import { useState } from "react";
import DayC from "./DayC";
import constants from "../data/constants.json";
import createMonthArr from "../utils/createMonthArr";
import events from "../data/events.json";

const Month = () => {
  let date = new Date();

  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [isDay, setIsDay] = useState(null);
  const [allEvents, setEvents] = useState(events);
  const [isDragging, setIsDragging] = useState(false);

  const days = createMonthArr(year, month);

  const moveEventToDate = (id, targetDate) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === Number(id) ? { ...ev, date: targetDate } : ev,
      ),
    );
  };

  const onDragStart = (e, eventId) => {
    e.stopPropagation();
    e.dataTransfer.setData("eventId", eventId);
  };

  const onTouchEnd = (e, event) => {
    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    const dateCell = dropTarget?.closest(".date");

    if (dateCell) {
      moveEventToDate(event.id, dateCell.id);
    }
  };

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
            {constants.months[month]} {year}
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
              <div
                className="date"
                id={item[4]}
                key={index}
                onClick={() => setIsDay(item)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const id = e.dataTransfer.getData("eventId");
                  moveEventToDate(id, item[4]);
                }}
              >
                <div className="date-cont">
                  <li className={item[0]}>{item[1]}</li>
                </div>
                {allEvents.filter((ev) => ev.date == item[4]).length > 0 && (
                  <div className="m-events">
                    {allEvents
                      .filter((ev) => ev.date == item[4])
                      .map((ev) => (
                        <div
                          className={`m-event ${isDragging ? "dragging" : ""}`}
                          key={ev.id}
                          draggable="true"
                          onDragStart={(e) => onDragStart(e, ev.id)}
                          onTouchStart={() => setIsDragging(true)}
                          onTouchEnd={(e) => {
                            setIsDragging(false);
                            onTouchEnd(e, ev);
                          }}
                          style={{ touchAction: "none" }}
                        >
                          <p>{ev.title}</p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </ul>
        </section>
        {isDay ? (
          <DayC
            setEvents={setEvents}
            events={allEvents}
            day={isDay}
            setIsDay={setIsDay}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Month;
