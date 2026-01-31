import { useState, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Blackboard, Toolbar } from './components';
import type { Tool, BoardColor } from './types';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a0a',
      paper: '#121212',
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(30, 30, 35, 0.95)',
          backdropFilter: 'blur(8px)',
          fontSize: '0.8rem',
          padding: '6px 12px',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        },
        arrow: {
          color: 'rgba(30, 30, 35, 0.95)',
        },
      },
    },
  },
});

function App() {
  const [activeTool, setActiveTool] = useState<Tool>('chalk');
  const [boardColor, setBoardColor] = useState<BoardColor>('green');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'c' || e.key === 'C') {
        setActiveTool('chalk');
      } else if (e.key === 'd' || e.key === 'D') {
        setActiveTool('duster');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        data-testid="app-container"
        sx={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Blackboard tool={activeTool} boardColor={boardColor} />
        <Toolbar 
          activeTool={activeTool} 
          onToolChange={setActiveTool}
          boardColor={boardColor}
          onBoardColorChange={setBoardColor}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
