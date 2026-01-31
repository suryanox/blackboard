export type Tool = 'chalk' | 'duster';

export interface Point {
  x: number;
  y: number;
}

export interface ToolButtonProps {
  active: boolean;
  onClick: () => void;
}
