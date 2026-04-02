import "./DayC.css";
import constants from "../data/constants.json";
import { useState } from "react";

const DayC = ({ day, setIsDay, setEvents, events }) => {
  const [createForm, setCreateForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(day[4]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isMore, setMore] = useState(false);

  let todayEvents = events.filter((event) => event.date == day[4]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newEvent = {
      id: events[events.length - 1].id + 1,
      title,
      date,
      location,
      description,
    };
    setEvents((prev) => [...prev, newEvent]);

    setCreateForm(false);
  };

  const handleUpdate = (e, item) => {
    e.preventDefault();

    setEvents((events) =>
      events.map((event) =>
        event.id === item.id
          ? { ...event, title, date, location, description }
          : event,
      ),
    );

    setUpdateForm(false);
  };

  const handleDeleteEvent = (id) => {
    setMore(false);
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <div className="day-c">
      <div className="day-cont">
        <p className="close" onClick={() => setIsDay(null)}>
          X
        </p>
        <h2>
          {constants.months[day[2]]} {day[1]}, {day[3]}
        </h2>
        <div className="d-events-cont">
          {createForm ? (
            <form className="d-form" onSubmit={handleSubmit}>
              <p className="s-close" onClick={() => setCreateForm(false)}>
                X
              </p>
              <input
                name="title"
                type="text"
                required
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
              />
              <input
                name="date"
                type="date"
                required
                placeholder="Date"
                value={date}
                onChange={handleDateChange}
              />
              <input
                name="location"
                type="text"
                placeholder="Location"
                value={location}
                onChange={handleLocationChange}
              />
              <input
                name="description"
                type="text"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
              />
              <button className="b-btn" type="submit">
                Add event
              </button>
            </form>
          ) : (
            <button
              className="b-btn"
              onClick={() => {
                setCreateForm(true);
                setUpdateForm(false);
                setTitle("");
                setDate(day[4]);
                setLocation("");
                setDescription("");
              }}
            >
              Add event +
            </button>
          )}
          <div className="d-events">
            {todayEvents.map((event) => {
              return updateForm ? (
                <div key={event.id}>
                  <form
                    action=""
                    onSubmit={(e) => handleUpdate(e, event)}
                    className="d-form"
                  >
                    <div className="s-close">
                      <img
                        className="more-btn"
                        src="/dots.svg"
                        alt=""
                        onClick={() => setMore(!isMore)}
                      />
                      {isMore && (
                        <div className="opts">
                          <p
                            className="more-btn"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            Delete
                          </p>
                        </div>
                      )}
                      <p onClick={() => setUpdateForm(false)}>X</p>
                    </div>

                    <input
                      name="title"
                      type="text"
                      required
                      placeholder="Title"
                      value={title}
                      onChange={handleTitleChange}
                    />
                    <input
                      name="date"
                      type="date"
                      required
                      placeholder="Date"
                      value={date}
                      onChange={handleDateChange}
                    />
                    <input
                      name="location"
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={handleLocationChange}
                    />
                    <input
                      name="description"
                      type="text"
                      placeholder="Description"
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                    <button className="b-btn">Update event</button>
                  </form>
                </div>
              ) : (
                <div className="d-event" key={event.id}>
                  <div className="l-cont">
                    <h3>{event.title}</h3>
                    {event.location ? <p>Location: {event.location}</p> : null}
                    {event.description ? (
                      <p>Description: {event.description}</p>
                    ) : null}
                  </div>
                  <div className="r-cont">
                    <p>{event.date}</p>
                    <button
                      className="update-btn"
                      onClick={() => {
                        setUpdateForm(event.id);
                        setCreateForm(false);
                        setTitle(event.title);
                        setDate(event.date);
                        setLocation(event.location);
                        setDescription(event.description);
                      }}
                    >
                      <img src="/pencil.svg" alt="update" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayC;
