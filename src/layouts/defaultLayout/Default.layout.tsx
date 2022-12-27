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

export default DefaultLayout;
