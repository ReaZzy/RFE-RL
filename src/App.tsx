import React from 'react';
import { ThemeProvider } from '@mui/material';
import { router } from '@src/router/router';
import { appTheme } from '@src/styles/theme';
import { RouterProvider } from '@tanstack/react-router';
const App: React.FC = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
