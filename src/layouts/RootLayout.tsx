import React from 'react';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
   return (
      <div className="mt-[20px] mx-[20px]">
         <Outlet />
      </div>
   );
}
