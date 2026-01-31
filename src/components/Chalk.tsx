import { Box, IconButton, Tooltip } from '@mui/material';
import type { ToolButtonProps } from '../types';

export const Chalk = ({ active, onClick }: ToolButtonProps) => {
  return (
    <Tooltip title="Chalk (C)" placement="top" arrow>
      <IconButton
        onClick={onClick}
        data-testid="chalk-button"
        sx={{
          width: 56,
          height: 72,
          backgroundColor: active ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          borderRadius: 3,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: active ? 'scale(1.05)' : 'scale(1)',
          boxShadow: active 
            ? '0 4px 20px rgba(255, 255, 255, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.3)' 
            : '0 2px 8px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            transform: 'scale(1.08)',
          },
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 48,
            borderRadius: '3px 3px 5px 5px',
            background: `
              linear-gradient(
                90deg,
                #d4d4d4 0%,
                #ffffff 25%,
                #f8f8f8 50%,
                #ffffff 75%,
                #d4d4d4 100%
              )
            `,
            boxShadow: `
              inset -2px 0 6px rgba(0, 0, 0, 0.15),
              inset 2px 0 6px rgba(255, 255, 255, 0.4),
              0 3px 8px rgba(0, 0, 0, 0.4),
              0 1px 2px rgba(0, 0, 0, 0.2)
            `,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 8,
              height: 4,
              borderRadius: '0 0 4px 4px',
              backgroundColor: 'rgba(200, 200, 200, 0.8)',
            },
          }}
        />
      </IconButton>
    </Tooltip>
  );
};
