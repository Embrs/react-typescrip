import React, { useEffect } from 'react';
import RouteHander from '../../Route';
import Menutest from '../../Components/SideBarMenu';

const UnMount = () => {
};

const Mount = () => {
  useEffect(() => {
    return UnMount;
  });
};

const Dashboard = ({ routes }: any) => {
  Mount();
  return (
    <div>
      <Menutest />
      <h1>Dashboard</h1>
      {RouteHander(routes)}
    </div>
  );
};

export default Dashboard;
