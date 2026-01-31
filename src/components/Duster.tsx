import { Box, IconButton, Tooltip } from '@mui/material';
import type { ToolButtonProps } from '../types';

export const Duster = ({ active, onClick }: ToolButtonProps) => {
  return (
    <Tooltip title="Duster (D)" placement="top" arrow>
      <IconButton
        onClick={onClick}
        data-testid="duster-button"
        sx={{
          width: 72,
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
            width: 44,
            height: 28,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 2,
              right: 2,
              height: 14,
              borderRadius: '4px 4px 2px 2px',
              background: `
                linear-gradient(
                  180deg,
                  #b8860b 0%,
                  #8b4513 30%,
                  #654321 100%
                )
              `,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 2,
                left: 4,
                right: 4,
                height: 2,
                borderRadius: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 12,
              borderRadius: '2px 2px 3px 3px',
              background: `
                linear-gradient(
                  180deg,
                  #e0e0e0 0%,
                  #c8c8c8 50%,
                  #b0b0b0 100%
                )
              `,
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '2px 3px',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  repeating-linear-gradient(
                    90deg,
                    transparent 0px,
                    transparent 3px,
                    rgba(0, 0, 0, 0.05) 3px,
                    rgba(0, 0, 0, 0.05) 4px
                  )
                `,
                borderRadius: 'inherit',
              },
            }}
          />
        </Box>
      </IconButton>
    </Tooltip>
  );
};
