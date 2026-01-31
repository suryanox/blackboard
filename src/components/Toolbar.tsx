import { Box, IconButton, Tooltip } from '@mui/material';
import type { Tool } from '../types';

interface ToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  onClear?: () => void;
  onDownload?: () => void;
}

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ChalkIcon = ({ active }: { active: boolean }) => (
  <Box
    sx={{
      width: 8,
      height: 32,
      borderRadius: '2px 2px 4px 4px',
      background: active
        ? 'linear-gradient(90deg, #e0e0e0 0%, #ffffff 50%, #e0e0e0 100%)'
        : 'linear-gradient(90deg, #a0a0a0 0%, #c0c0c0 50%, #a0a0a0 100%)',
      boxShadow: active
        ? '0 0 8px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.3)'
        : '0 2px 4px rgba(0,0,0,0.3)',
      transition: 'all 0.2s ease',
    }}
  />
);

const DusterIcon = ({ active }: { active: boolean }) => (
  <Box sx={{ width: 32, height: 20, position: 'relative' }}>
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 2,
        right: 2,
        height: 10,
        borderRadius: '3px 3px 1px 1px',
        background: active
          ? 'linear-gradient(180deg, #d4a050 0%, #8b5a2b 100%)'
          : 'linear-gradient(180deg, #a08060 0%, #6b4423 100%)',
        boxShadow: active ? '0 0 8px rgba(180,130,80,0.5)' : 'none',
        transition: 'all 0.2s ease',
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 8,
        borderRadius: '1px 1px 2px 2px',
        background: 'linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 100%)',
      }}
    />
  </Box>
);

export const Toolbar = ({ 
  activeTool, 
  onToolChange, 
  onClear,
  onDownload,
}: ToolbarProps) => {
  return (
    <Box
      data-testid="toolbar"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          padding: '10px 20px',
          background: 'linear-gradient(180deg, #8b7355 0%, #5a4434 100%)',
          borderRadius: '12px 12px 0 0',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Tooltip title="Chalk (C)" placement="top" arrow>
          <IconButton
            onClick={() => onToolChange('chalk')}
            data-testid="chalk-button"
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: activeTool === 'chalk' 
                ? 'rgba(255, 255, 255, 0.2)' 
                : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              },
            }}
          >
            <ChalkIcon active={activeTool === 'chalk'} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Duster (D)" placement="top" arrow>
          <IconButton
            onClick={() => onToolChange('duster')}
            data-testid="duster-button"
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: activeTool === 'duster' 
                ? 'rgba(255, 255, 255, 0.2)' 
                : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              },
            }}
          >
            <DusterIcon active={activeTool === 'duster'} />
          </IconButton>
        </Tooltip>

        <Box sx={{ width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.2)', mx: 1 }} />

        <Tooltip title="Clear Board" placement="top" arrow>
          <IconButton
            onClick={() => onClear?.()}
            data-testid="clear-button"
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              color: '#d4c4b0',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
              },
            }}
          >
            <TrashIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Download" placement="top" arrow>
          <IconButton
            onClick={() => onDownload?.()}
            data-testid="download-button"
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              color: '#d4c4b0',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
              },
            }}
          >
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
