import React from 'react';

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
    <div className="font-mono bg-white text-slate-700 px-8 py-4 rounded-xl shadow-md min-w-[320px] h-fit">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2 mb-4">
        <h3 className="font-bold text-lg">Room Info</h3>
        <span className="text-lg">Code: {code}</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-4 items-center">
        <div className="font-bold border-b border-gray-300 pb-1">Player</div>
        <div className="font-bold border-b border-gray-300 pb-1">Status</div>

        {players.map((p, i) => (
          <React.Fragment key={i}>
            <div className="py-1">{p.name}</div>
            <div
              className={`py-1 font-semibold ${
                p.status === 'Ready'
                  ? 'text-green-600'
                  : p.status === 'Joined'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
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
