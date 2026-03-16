export default function RoomCard({ room, onBook }) {
  return (
    <div className="room-card">
      <div className="room-card-header">
        <h3 className="room-name">{room.name}</h3>
        <span className="price-tag">{room.pricePerHour} kr/h</span>
      </div>
      <p className="room-description">{room.description}</p>
      <p className="room-capacity">
        <span className="icon">👥</span> Up to {room.capacity} people
      </p>
      <div className="amenities">
        {room.amenities.map((amenity) => (
          <span key={amenity} className="amenity-badge">
            {amenity}
          </span>
        ))}
      </div>
      <button className="book-btn" onClick={() => onBook(room)}>
        Book Room
      </button>
    </div>
  );
}
