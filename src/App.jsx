import { useState, useEffect } from "react";
import Header from "./components/Header";
import RoomCard from "./components/RoomCard";
import BookingModal from "./components/BookingModal";
import BookingList from "./components/BookingList";
import FilterBar from "./components/FilterBar";
import { ROOMS } from "./data/rooms";
import "./App.css";

const today = new Date().toISOString().split("T")[0];

export default function App() {
  const [selectedDate, setSelectedDate] = useState(today);
  const [bookings, setBookings] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [capacityFilter, setCapacityFilter] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [activeTab, setActiveTab] = useState("rooms");

  // Clear confirmation banner after 4 seconds
  useEffect(() => {
    if (!confirmation) return;
    const timer = setTimeout(() => setConfirmation(null), 4000);
    return () => clearTimeout(timer);
  }, [confirmation]);

  const handleBook = (room) => {
    setActiveRoom(room);
    setConfirmation(null);
  };

  const handleConfirm = ({ name, email, timeSlot, duration }) => {
    const newBooking = {
      id: Date.now(),
      name,
      email,
      timeSlot,
      duration,
      date: selectedDate,
      room: activeRoom,
      roomId: activeRoom.id,
    };
    setBookings((prev) => [newBooking, ...prev]);
    setConfirmation(newBooking);
    setActiveRoom(null);
    setActiveTab("bookings");
  };

  const handleCancel = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const filteredRooms = ROOMS.filter((r) => r.capacity >= capacityFilter).sort((a, b) => {
    if (sortBy === "price-asc") return a.pricePerHour - b.pricePerHour;
    if (sortBy === "price-desc") return b.pricePerHour - a.pricePerHour;
    if (sortBy === "capacity") return b.capacity - a.capacity;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="app">
      <Header bookingCount={bookings.length} />

      <main className="main">
        <div className="date-row">
          <label className="date-label" htmlFor="date-picker">
            Select Date
          </label>
          <input
            id="date-picker"
            type="date"
            className="date-picker"
            value={selectedDate}
            min={today}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setConfirmation(null);
            }}
          />
        </div>

        {confirmation && (
          <div className="confirmation-banner" role="alert">
            ✓ Booked <strong>{confirmation.room.name}</strong> at{" "}
            <strong>{confirmation.timeSlot}</strong> on{" "}
            <strong>
              {new Date(confirmation.date).toLocaleDateString("en-SE", {
                month: "long",
                day: "numeric",
              })}
            </strong>
            .
          </div>
        )}

        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "rooms" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("rooms")}
          >
            Rooms
          </button>
          <button
            className={`tab-btn ${activeTab === "bookings" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            My Bookings{bookings.length > 0 ? ` (${bookings.length})` : ""}
          </button>
        </div>

        {activeTab === "rooms" && (
          <section>
            <FilterBar
              capacityFilter={capacityFilter}
              onCapacityChange={setCapacityFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            {filteredRooms.length === 0 ? (
              <p className="no-results">No rooms match the selected capacity filter.</p>
            ) : (
              <div className="room-grid">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} onBook={handleBook} />
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "bookings" && (
          <section>
            <BookingList bookings={bookings} onCancel={handleCancel} />
          </section>
        )}
      </main>

      {activeRoom && (
        <BookingModal
          room={activeRoom}
          selectedDate={selectedDate}
          existingBookings={bookings}
          onConfirm={handleConfirm}
          onClose={() => setActiveRoom(null)}
        />
      )}
    </div>
  );
}
