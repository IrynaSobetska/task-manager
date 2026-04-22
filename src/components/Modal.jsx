import "./Modal.css";
import { useState } from "react";
import constants from "../data/constants.json";

const Modal = ({ type, setIsModal, events, setEvents, day }) => {
  // fix: responsive design
  const [tempType, setTempType] = useState("update");
  const [updateForm, setUpdateForm] = useState(false);
  const [createForm, setCreateForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    // time: "",
    loc: "",
    description: "",
  });

  let todayEvents = events.filter((event) => event.date == day[4]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let id = 0;

    if (events.length > 0) {
      id = events[events.length - 1].id + 1;
    }

    const newEvent = {
      id: id,
      title: formData.title,
      date: formData.date,
      // time: formData.time,
      loc: formData.loc,
      description: formData.description,
    };
    setEvents((prev) => [...prev, newEvent]);

    setIsModal(false);
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();

    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...formData } : event,
      ),
    );

    console.log(formData);

    setUpdateForm(false);
  };

  const handleEvent = (e, id = null) => {
    e.preventDefault();

    if (id !== null) {
      // UPDATE LOGIC
      setEvents((prev) =>
        prev.map((event) =>
          event.id === id ? { ...event, ...formData } : event,
        ),
      );

      setUpdateForm(false);
    } else {
      // CREATE LOGIC
      const newId = events.length > 0 ? events[events.length - 1].id + 1 : 0;
      const newEvent = { id: newId, ...formData };
      setEvents((prev) => [...prev, newEvent]);

      setIsModal(false);
    }

    // Clear the form so it's fresh for next time
    setFormData({ title: "", date: "", loc: "", description: "" });
  };

  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <div className="overlay">
      <div className="modal-cont">
        <p className="close" onClick={() => setIsModal(null)}>
          X
        </p>
        <div>
          {type === "create" && (
            <form className="e-form create-form" onSubmit={handleEvent}>
              {constants.forms.create.map((element) =>
                element.tag === "input" ? (
                  <input
                    key={element.name}
                    name={element.name}
                    type={element.type}
                    required={element.required}
                    placeholder={element.placeholder}
                    value={formData[element.name]}
                    onChange={handleChange}
                  />
                ) : (
                  <textarea
                    key={element.name}
                    name={element.name}
                    type={element.type}
                    required={element.required}
                    placeholder={element.placeholder}
                    value={formData[element.name]}
                    onChange={handleChange}
                  />
                ),
              )}
              <div className="btn-cont">
                <button
                  className="a-btn"
                  type="button"
                  onClick={() => setIsModal(false)}
                >
                  Cancel
                </button>
                <button className="a-btn" type="submit">
                  Add event
                </button>
              </div>
            </form>
          )}

          {type === "day" && (
            <>
              <h2>
                {constants.days[parseInt(new Date(day[4]).getDay()) - 1]},{" "}
                {constants.months[day[2]]} {day[1]}
              </h2>

              {tempType === "create" ? (
                <form className="e-form" onSubmit={handleEvent}>
                  {constants.forms.create.map((element) =>
                    element.tag === "input" ? (
                      <input
                        key={element.name}
                        name={element.name}
                        type={element.type}
                        required={element.required}
                        placeholder={element.placeholder}
                        value={formData[element.name]}
                        onChange={handleChange}
                      />
                    ) : (
                      <textarea
                        key={element.name}
                        name={element.name}
                        type={element.type}
                        required={element.required}
                        placeholder={element.placeholder}
                        value={formData[element.name]}
                        onChange={handleChange}
                      />
                    ),
                  )}
                  <div className="btn-cont">
                    <button
                      className="a-btn"
                      type="button"
                      onClick={() => setTempType(false)}
                    >
                      Cancel
                    </button>
                    <button className="a-btn" type="submit">
                      Add event
                    </button>
                  </div>
                </form>
              ) : (
                <div className="r-btn-cont">
                  <button
                    className="a-btn"
                    onClick={() => {
                      // setIsDay(true);
                      // setModalType("create");
                      setTempType("create");
                      setUpdateForm(false);
                      setFormData({
                        title: "",
                        date: day[4],
                        loc: "",
                        description: "",
                      });
                    }}
                  >
                    + Add event
                  </button>
                </div>
              )}

              <div className="modal-events">
                {todayEvents.map((event) => {
                  return updateForm === event.id ? (
                    <div key={event.id}>
                      <form
                        action=""
                        onSubmit={(e) => handleEvent(e, event.id)}
                        className="e-form"
                      >
                        {constants.forms.create.map((element) =>
                          element.tag === "input" ? (
                            <input
                              key={element.name}
                              name={element.name}
                              type={element.type}
                              required={element.required}
                              placeholder={element.placeholder}
                              value={formData[element.name]}
                              onChange={handleChange}
                            />
                          ) : (
                            <textarea
                              key={element.name}
                              name={element.name}
                              type={element.type}
                              required={element.required}
                              placeholder={element.placeholder}
                              value={formData[element.name]}
                              onChange={handleChange}
                            />
                          ),
                        )}

                        <div className="btn-cont">
                          <button
                            type="button"
                            className="a-btn"
                            onClick={() => setUpdateForm(false)}
                          >
                            Cancel
                          </button>
                          <button className="a-btn">Update event</button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="modal-ev" key={event.id}>
                      <div className="ev-info">
                        <h3>{event.title}</h3>
                        {event.loc ? <p>{event.loc}</p> : null}
                        {event.description ? <p>{event.description}</p> : null}
                        <p>{event.date.replaceAll("-", ".")}</p>
                      </div>
                      <div className="ev-change">
                        <button
                          className="update"
                          onClick={() => {
                            setUpdateForm(event.id);
                            // setCreateForm(false);
                            setTempType("");
                            setFormData({
                              title: event.title,
                              date: event.date,
                              loc: event.loc,
                              description: event.description,
                            });
                          }}
                        >
                          <img src="/pencil.svg" alt="update" />
                        </button>
                        <button
                          className="delete"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <img src="/bin.svg" alt="delete" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
