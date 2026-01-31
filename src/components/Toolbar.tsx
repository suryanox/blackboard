import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadIcon from '@mui/icons-material/Download';
import type { Tool } from '../types';

interface ToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  onClear?: () => void;
  onDownload?: () => void;
}

const ToolButton = ({ 
  active, 
  onClick, 
  icon, 
  tooltip,
  testId,
}: { 
  active?: boolean; 
  onClick: () => void; 
  icon: React.ReactNode;
  tooltip: string;
  testId?: string;
}) => (
  <Tooltip title={tooltip} placement="top" arrow>
    <IconButton
      onClick={onClick}
      data-testid={testId}
      sx={{
        width: 40,
        height: 40,
        borderRadius: 2,
        backgroundColor: active ? '#6366f1' : 'transparent',
        color: active ? '#fff' : '#64748b',
        transition: 'all 0.15s ease',
        '&:hover': {
          backgroundColor: active ? '#5558e3' : 'rgba(100, 116, 139, 0.1)',
          color: active ? '#fff' : '#334155',
        },
      }}
    >
      {icon}
    </IconButton>
  </Tooltip>
);

const Divider = () => (
  <Box
    sx={{
      width: 1,
      height: 24,
      backgroundColor: '#e2e8f0',
      mx: 0.5,
    }}
  />
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
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        padding: '8px 12px',
        backgroundColor: '#ffffff',
        borderRadius: 3,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e2e8f0',
      }}
    >
      <ToolButton
        active={activeTool === 'chalk'}
        onClick={() => onToolChange('chalk')}
        icon={<EditIcon sx={{ fontSize: 20 }} />}
        tooltip="Chalk (C)"
        testId="chalk-button"
      />
      <ToolButton
        active={activeTool === 'duster'}
        onClick={() => onToolChange('duster')}
        icon={<AutoFixHighIcon sx={{ fontSize: 20 }} />}
        tooltip="Eraser (D)"
        testId="duster-button"
      />

      <Divider />

      <ToolButton
        onClick={() => onClear?.()}
        icon={<DeleteOutlineIcon sx={{ fontSize: 20 }} />}
        tooltip="Clear Board"
      />
      <ToolButton
        onClick={() => onDownload?.()}
        icon={<DownloadIcon sx={{ fontSize: 20 }} />}
        tooltip="Download"
      />
    </Box>
  );
};
