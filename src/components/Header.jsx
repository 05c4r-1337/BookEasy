export default function Header({ bookingCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div>
          <h1 className="logo">BookEasy</h1>
          <p className="tagline">Meeting Room Booking System</p>
        </div>
        {bookingCount > 0 && (
          <div className="booking-badge">
            {bookingCount} active booking{bookingCount > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </header>
  );
}
