import React from 'react';
import { ThemeProvider } from '@mui/material';
import { appRouter } from '@src/router/router';
import { appTheme } from '@src/styles/theme';
import { RouterProvider } from '@tanstack/react-router';
const App: React.FC = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  );
};

export default App;
