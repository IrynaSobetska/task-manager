import "./Views.css";
import { useState } from "react";
import Modal from "./Modal";
import constants from "../data/constants.json";
import createMonthArr from "../utils/createMonthArr";
import events from "../data/events.json";
import MEvents from "./MEvents";

const Month = () => {
  let date = new Date();

  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [isDay, setIsDay] = useState(null);
  const [allEvents, setEvents] = useState(events);
  const [modalType, setModalType] = useState("");

  const moveEventToDate = (id, targetDate) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === Number(id) ? { ...ev, date: targetDate } : ev,
      ),
    );
  };

  return (
    <div>
      <div className="calendar">
        <header>
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
          <h3>
            {constants.months[month]} {year}
          </h3>
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
          <button
            className="a-btn"
            onClick={() => {
              setIsDay(true);
              setModalType("create");
            }}
          >
            + Add event
          </button>
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
            {createMonthArr(year, month).map((item, index) => (
              <div
                className="date"
                id={item[4]}
                key={index}
                onClick={() => {
                  setIsDay(item);
                  setModalType("day");
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const id = e.dataTransfer.getData("eventId");
                  moveEventToDate(id, item[4]);
                }}
              >
                <div className="date-cont">
                  <li className={item[0]}>{item[1]}</li>
                </div>
                {allEvents && (
                  <MEvents
                    item={item}
                    allEvents={allEvents}
                    moveEventToDate={moveEventToDate}
                  />
                )}
              </div>
            ))}
          </ul>
        </section>
        {isDay ? (
          <Modal
            type={modalType}
            setIsModal={setIsDay}
            events={allEvents}
            setEvents={setEvents}
            day={isDay}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Month;
