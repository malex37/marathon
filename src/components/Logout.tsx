import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppConfig } from '../environment';
import { AuthValidator } from '../tools/AuthTools';

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AuthValidator.clearAuthStorage();
    AuthValidator.checkAuth();
  });

  return (
    <div>Loging you out</div>
  );
};

export default Logout;