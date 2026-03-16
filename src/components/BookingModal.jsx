import { useState } from "react";
import { TIME_SLOTS } from "../data/rooms";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-SE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BookingModal({ room, selectedDate, existingBookings, onConfirm, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [duration, setDuration] = useState(1);
  const [errors, setErrors] = useState({});

  const bookedSlots = existingBookings
    .filter((b) => b.roomId === room.id && b.date === selectedDate)
    .map((b) => b.timeSlot);

  const availableSlots = TIME_SLOTS.filter((slot) => !bookedSlots.includes(slot));

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email.";
    if (!timeSlot) newErrors.timeSlot = "Please select a time slot.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onConfirm({ name, email, timeSlot, duration });
  };

  const totalPrice = room.pricePerHour * duration;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Book {room.name}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <p className="modal-date">{formatDate(selectedDate)}</p>

        {availableSlots.length === 0 ? (
          <p className="no-slots">All time slots for this date are booked.</p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                className={`form-input ${errors.name ? "input-error" : ""}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
              />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className={`form-input ${errors.email ? "input-error" : ""}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Time Slot</label>
              <select
                className={`form-input ${errors.timeSlot ? "input-error" : ""}`}
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="">Select a time slot</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.timeSlot && <span className="error-msg">{errors.timeSlot}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Duration</label>
              <select
                className="form-input"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              >
                {[1, 2, 3, 4].map((h) => (
                  <option key={h} value={h}>
                    {h} hour{h > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-footer">
              <span className="total-price">Total: {totalPrice} kr</span>
              <button type="submit" className="confirm-btn">
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
