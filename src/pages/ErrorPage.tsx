import { Navigate, useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  return error ? (
    <Navigate
      to='/'
      replace
    />
  ) : null;
};

export default ErrorPage;
