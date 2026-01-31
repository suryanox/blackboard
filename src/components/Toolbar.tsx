import { Box } from '@mui/material';
import { Chalk } from './Chalk.tsx';
import { Duster } from './Duster.tsx';
import { BoardColorPicker } from './BoardColorPicker.tsx';
import type { Tool, BoardColor } from '../types';

interface ToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  boardColor: BoardColor;
  onBoardColorChange: (color: BoardColor) => void;
}

export const Toolbar = ({ activeTool, onToolChange, boardColor, onBoardColorChange }: ToolbarProps) => {
  return (
    <Box
      data-testid="toolbar"
      sx={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '12px 20px',
        backgroundColor: 'rgba(20, 20, 25, 0.85)',
        backdropFilter: 'blur(16px)',
        borderRadius: 4,
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.4),
          0 2px 8px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.05)
        `,
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          padding: '8px 12px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: 3,
        }}
      >
        <Chalk
          active={activeTool === 'chalk'}
          onClick={() => onToolChange('chalk')}
        />
        <Duster
          active={activeTool === 'duster'}
          onClick={() => onToolChange('duster')}
        />
      </Box>

      <Box
        sx={{
          width: 1,
          height: 48,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      />

      <BoardColorPicker
        activeColor={boardColor}
        onColorChange={onBoardColorChange}
      />
    </Box>
  );
};
