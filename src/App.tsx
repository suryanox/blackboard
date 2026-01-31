import { useState, useEffect, useRef } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Blackboard, Toolbar } from './components';
import type { BlackboardHandle } from './components';
import type { Tool } from './types';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1e293b',
          fontSize: '0.75rem',
          padding: '6px 10px',
          borderRadius: 6,
        },
        arrow: {
          color: '#1e293b',
        },
      },
    },
  },
});

const BOARD_COLOR = '#1a1a1a';

function App() {
  const [activeTool, setActiveTool] = useState<Tool>('chalk');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const blackboardRef = useRef<BlackboardHandle>(null);

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

  const handleClear = () => {
    blackboardRef.current?.clear();
  };

  const handleDownload = () => {
    blackboardRef.current?.download();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        data-testid="app-container"
        sx={{
          width: '100vw',
          height: '100vh',
          overflow: 'auto',
          position: 'relative',
          backgroundColor: BOARD_COLOR,
        }}
        ref={scrollContainerRef}
      >
        <Blackboard
          ref={blackboardRef}
          tool={activeTool}
          scrollContainerRef={scrollContainerRef}
        />
        <Toolbar 
          activeTool={activeTool} 
          onToolChange={setActiveTool}
          onClear={handleClear}
          onDownload={handleDownload}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
