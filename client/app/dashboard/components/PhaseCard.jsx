export function PhaseCard({ title, managers, members }) {
    return (
        <div className="p-[1px] bg-gradient-to-r from-[#FF8A00] to-[#FFD700] rounded-lg">
          <div className="card border-4 border-transparent bg-white rounded-lg p-4 shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-gray-700">Managers: {managers}</p>
            <p className="text-sm text-gray-700">Members: {members}</p>
          </div>
        </div>
      );
      
  }
  
  