import { useEffect } from 'react';
import { AuthValidator } from '../tools/AuthTools';
import UserDashboard from './display/UserDashboard';

const Stats = () => {
  useEffect(() => {
    AuthValidator.checkAuth();
  });

  return (
    <div className="flex flex-col items-center">
      <UserDashboard/>
    </div>
  );
};

export default Stats;