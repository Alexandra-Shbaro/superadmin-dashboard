export function PhaseCard({ title, managers, members }) {
    return (
      <div className="card">
        <h3>{title}</h3>
        <p>Managers: {managers}</p>
        <p>Members: {members}</p>
      </div>
    );
  }
  
  