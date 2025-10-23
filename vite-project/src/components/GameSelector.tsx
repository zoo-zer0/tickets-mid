import type { Game } from './types.ts';
import { colorPalette } from './colors.ts';
interface Props {
  games: Game[];
  selectedGame: Game | null;
  onSelect: (game: Game) => void;
}

export const GameSelector: React.FC<Props> = ({ games, selectedGame, onSelect }) => (
  <div id = "game-selector" style={{textAlign:'left', marginTop:'4px'}}>
    {games.map(game => (
      <button
        key={game.id}
        onClick={() => onSelect(game)}
        style={{
            backgroundColor: selectedGame === game ? colorPalette.gameButton.selectedBg : colorPalette.gameButton.defaultBg,
            color: selectedGame === game ? colorPalette.gameButton.selectedText : colorPalette.gameButton.defaultText,
            margin: '4px'
        }}
      >
        {game.name}
      </button>
    ))}
  </div>
);
