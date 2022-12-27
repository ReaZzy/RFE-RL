import React, { ReactElement } from 'react';
import { ThemeProvider } from '@mui/material';
import { appRouter } from '@src/router/router';
import { appTheme } from '@src/styles/theme';
import { RouterProvider } from '@tanstack/react-router';
import { queries, render, RenderOptions } from '@testing-library/react';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) =>
  render(
    <ThemeProvider theme={appTheme}>
      <RouterProvider router={appRouter} />
    </ThemeProvider>,
    {
      queries: { ...queries },
      ...options,
    },
  );

export * from '@testing-library/react';
export { customRender as render };
