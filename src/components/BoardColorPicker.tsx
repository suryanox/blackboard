import { Box, IconButton, Tooltip } from '@mui/material';
import type { BoardColor } from '../types';

interface BoardColorPickerProps {
  activeColor: BoardColor;
  onColorChange: (color: BoardColor) => void;
}

const colorOptions = [
  { id: 'green' as BoardColor, color: '#1a3d1a', label: 'Green Board' },
  { id: 'black' as BoardColor, color: '#1a1a1a', label: 'Black Board' },
];

export const BoardColorPicker = ({ activeColor, onColorChange }: BoardColorPickerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
      }}
    >
      {colorOptions.map((option) => (
        <Tooltip key={option.id} title={option.label} placement="top" arrow>
          <IconButton
            onClick={() => onColorChange(option.id)}
            data-testid={`board-color-${option.id}`}
            sx={{
              width: 36,
              height: 36,
              padding: 0,
              borderRadius: 2,
              backgroundColor: option.color,
              border: activeColor === option.id 
                ? '2px solid rgba(255, 255, 255, 0.8)' 
                : '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: activeColor === option.id
                ? '0 0 12px rgba(255, 255, 255, 0.3)'
                : '0 2px 4px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                border: '2px solid rgba(255, 255, 255, 0.6)',
              },
            }}
          />
        </Tooltip>
      ))}
    </Box>
  );
};
