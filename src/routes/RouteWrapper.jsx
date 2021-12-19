import { Navigate } from "react-router-dom";

const RouteWrapper = ({ children }) => {
  const checkTokenExpiration = () => {
    let payload = atob(localStorage.getItem("token").split(".")[1]);
    let expiration = new Date(JSON.parse(payload).exp * 1000);
    let now = new Date();
    if (expiration.getTime() < now.getTime()) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
    return expiration.getTime() > now.getTime();
  };

  return localStorage.getItem("token") && checkTokenExpiration() ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/login",
      }}
    />
  );
};

export default RouteWrapper;
