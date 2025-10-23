// types.ts
export interface Game {
  id: string;
  name: string;
  gameType: GameType;
  stadium: string;
  data: number[]; // or whatever format your graph uses
}

export type GameType = '와일드카드' | '준플레이오프' | '플레이오프' | '한국시리즈';

export interface Seat {
  x: number;
  y: number;
  구역: string;
}

export interface CategoryInfo {
  카테고리: string;
  "가격/원가 비율 (%)": number;
    "평균_가격": number;
    "최고_가격": number;
    "최저_가격": number;
    "중앙_가격": number;
    "평균_원가": number;
    "좌석_개수": number;
}