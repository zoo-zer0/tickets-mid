import type { Game, Seat } from './types.ts';
// In parent component (e.g., DisplayArea.tsx)
import { stadiums } from "../assets/data/stadium";
import { categoryData } from "../assets/data/category";
import { StadiumChart } from "./StadiumChart";
import { StadiumGraph } from './StadiumGraph.tsx';
interface Props {
  game: Game | null;
}


interface Props {
  game: Game | null;
  selectedSeat: Seat | null;
  onSelect: (seat: Seat) => void;
}

export const DisplayArea: React.FC<Props> = ({ game, selectedSeat, onSelect }) => {
  if (!game) return <div>Select a game</div>;
  return (
    <div id='display-area' style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ width:'400px', height: '400px' }}>
        <StadiumChart game={game} 
        stadiumData={stadiums} 
        categoryData={categoryData}
        onSelect={onSelect}
        />
      </div>
      <div style={{height: '400px', width: '600px'}}>
        <StadiumGraph game={game}
        selectedSeat={selectedSeat}
        categoryData={categoryData}
        />
      </div>
    </div>
  );
};
