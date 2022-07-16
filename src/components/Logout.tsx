import { useEffect } from 'react';
import { AuthValidator } from '../tools/AuthTools';

const Logout = () => {
  useEffect(() => {
    AuthValidator.clearAuthStorage();
  });

  return <div></div>;
};

export default Logout;