import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppConfig } from '../environment';
import { AuthValidator } from '../tools/AuthTools';

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AuthValidator.clearAuthStorage();
    window.location.assign(AppConfig.loginUrl);
  });

  return <div></div>;
};

export default Logout;