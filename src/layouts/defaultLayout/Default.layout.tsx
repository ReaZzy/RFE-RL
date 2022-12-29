import React, { FC, ReactNode } from 'react';
import { Outlet } from '@tanstack/react-router';

interface DefaultLayoutProps {
  children?: ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

DefaultLayout.displayName = 'DefaultLayout';
export default DefaultLayout;
