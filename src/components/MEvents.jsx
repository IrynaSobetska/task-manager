import { useState } from "react";
import "./Views.css";

const MEvents = ({ item, allEvents, moveEventToDate }) => {
  const dayEvents = allEvents?.filter((ev) => ev.date == item[4]);
  const [isDragging, setIsDragging] = useState(false);

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
    <div className="m-events">
      {dayEvents?.slice(0, 1).map((ev) => (
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
          {ev.title}
        </div>
      ))}

      {dayEvents?.length > 1 && (
        <p className="more-text">+{dayEvents.length - 1} more</p>
      )}
    </div>
  );
};

export default MEvents;
