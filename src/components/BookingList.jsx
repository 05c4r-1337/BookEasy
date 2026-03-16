function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-SE", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function BookingItem({ booking, onCancel }) {
  const total = booking.room.pricePerHour * booking.duration;

  return (
    <div className="booking-item">
      <div className="booking-info">
        <strong className="booking-room">{booking.room.name}</strong>
        <span className="booking-detail">
          {formatDate(booking.date)} · {booking.timeSlot} · {booking.duration}h
        </span>
        <span className="booking-detail">{booking.name}</span>
        <span className="booking-price">{total} kr</span>
      </div>
      <button
        className="cancel-btn"
        onClick={() => onCancel(booking.id)}
        aria-label={`Cancel booking for ${booking.room.name}`}
      >
        Cancel
      </button>
    </div>
  );
}

export default function BookingList({ bookings, onCancel }) {
  if (bookings.length === 0) {
    return (
      <p className="no-bookings">
        No bookings yet. Pick a date, select a room, and book!
      </p>
    );
  }

  return (
    <div className="booking-list">
      {bookings.map((booking) => (
        <BookingItem key={booking.id} booking={booking} onCancel={onCancel} />
      ))}
    </div>
  );
}
