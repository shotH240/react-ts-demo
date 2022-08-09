import React from 'react';
import { Outlet } from 'react-router-dom';

export default function RouteMock() {
  return (
    <div>
      RouteMock
      <Outlet />
    </div>
  )
}