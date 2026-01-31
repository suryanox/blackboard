export type Tool = 'chalk' | 'duster';

export type BoardColor = 'black';

export interface Point {
  x: number;
  y: number;
}

export interface DrawingState {
  isDrawing: boolean;
  tool: Tool;
  lastPoint: Point | null;
}

export interface ToolButtonProps {
  active: boolean;
  onClick: () => void;
}
