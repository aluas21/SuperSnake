import React from 'react';
import './GameRoomInfo.css';

interface Player {
  name: string;
  status: 'Ready' | 'Joined';
}

interface RoomInfoProps {
  code: string;
  players: Player[];
}

const GameRoomInfo: React.FC<RoomInfoProps> = ({ code, players }) => {
  return (
    <div className="room-info">
      <div className="room-info__header">
        <h3>Room Info</h3>
        <span className="room-info__code">Code: {code}</span>
      </div>
      <div className="room-info__grid">
        <div className="room-info__colhead">Player</div>
        <div className="room-info__colhead">Status</div>

        {players.map((p, i) => (
          <React.Fragment key={i}>
            <div className="room-info__cell">{p.name}</div>
            <div
              className={`room-info__cell room-info__status ${p.status
                .toLowerCase()
                .replace(' ', '-')}`}
            >
              {p.status}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GameRoomInfo;
