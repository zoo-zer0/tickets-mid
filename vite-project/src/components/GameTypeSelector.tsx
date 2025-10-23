import type { GameType } from "./types";
import { colorPalette } from "./colors";
//'wildCard' | 'prePO' | 'playOffs' | 'KoreanSeries'
interface Props {
  selectedGameType: GameType | null;
  onSelect: (type: GameType) => void;
}

export const GameTypeSelector: React.FC<Props> = ({ selectedGameType, onSelect }) => {
  const types: GameType[] = ['와일드카드', '준플레이오프', '플레이오프', '한국시리즈'];

  return (
    <div id="game-type-selector">
      {types.map(type => (
        <button
          key={type}
          onClick={() => onSelect(type)}
            style={{
                backgroundColor: selectedGameType === type ? colorPalette.gameTypeButton.selectedBg : colorPalette.gameTypeButton.defaultBg,
                color: selectedGameType === type ? colorPalette.gameTypeButton.selectedText : colorPalette.gameTypeButton.defaultText,
                margin: '8px 4px',
            }}
        >
          {type}
        </button>
      ))}
    </div>
  );
};
export default GameTypeSelector;
