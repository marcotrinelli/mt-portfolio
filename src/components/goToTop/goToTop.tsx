import { useEffect } from "react";
import { useLocation } from "react-router";

interface GoToTopProps {
  children: React.ReactNode;
}

const GoToTop: React.FC<GoToTopProps> = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

export default GoToTop;
