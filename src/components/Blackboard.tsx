import { Box } from '@mui/material';
import { forwardRef, useImperativeHandle } from 'react';
import { useCanvas } from '../hooks/useCanvas.ts';
import { createChalkCursor, createDusterCursor } from '../utils/cursors.ts';
import type { Tool } from '../types';
import type { RefObject } from 'react';

interface BlackboardProps {
  tool: Tool;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

export interface BlackboardHandle {
  clear: () => void;
  download: () => void;
}

const BOARD_COLOR = '#1a1a1a';

export const Blackboard = forwardRef<BlackboardHandle, BlackboardProps>(
  ({ tool, scrollContainerRef }, ref) => {
  const { canvasRef, canvasSize, clearCanvas, downloadCanvas } = useCanvas(tool, { scrollContainerRef });
  const cursor = tool === 'chalk' ? createChalkCursor() : createDusterCursor();

  useImperativeHandle(ref, () => ({
    clear: clearCanvas,
    download: downloadCanvas,
  }), [clearCanvas, downloadCanvas]);

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
          backgroundColor: BOARD_COLOR,
          cursor: cursor,
          touchAction: 'none',
        }}
      />
    </Box>
  );
});
