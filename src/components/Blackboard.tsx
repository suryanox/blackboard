import { Box } from '@mui/material';
import { useCanvas } from '../hooks/useCanvas.ts';
import { createChalkCursor, createDusterCursor } from '../utils/cursors.ts';
import type { Tool, BoardColor } from '../types';
import type { RefObject } from 'react';

interface BlackboardProps {
  tool: Tool;
  boardColor: BoardColor;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

const boardColors = {
  green: {
    base: '#1a3d1a',
    gradient1: 'rgba(40, 70, 40, 0.4)',
    gradient2: 'rgba(30, 55, 30, 0.3)',
  },
  black: {
    base: '#1a1a1a',
    gradient1: 'rgba(40, 40, 45, 0.4)',
    gradient2: 'rgba(30, 30, 35, 0.3)',
  },
};

export const Blackboard = ({ tool, boardColor, scrollContainerRef }: BlackboardProps) => {
  const { canvasRef, canvasSize } = useCanvas(tool, { scrollContainerRef });
  const colors = boardColors[boardColor];
  const cursor = tool === 'chalk' ? createChalkCursor() : createDusterCursor();

  return (
    <Box
      sx={{
        position: 'relative',
        width: `${canvasSize.width}px`,
        height: `${canvasSize.height}px`,
        zIndex: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        data-testid="blackboard-canvas"
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          width: `${canvasSize.width}px`,
          height: `${canvasSize.height}px`,
          backgroundColor: colors.base,
          backgroundImage: `
            radial-gradient(ellipse at 20% 20%, ${colors.gradient1} 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, ${colors.gradient2} 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")
          `,
          backgroundBlendMode: 'soft-light, soft-light, overlay',
          cursor: cursor,
          touchAction: 'none',
        }}
      />
    </Box>
  );
};
