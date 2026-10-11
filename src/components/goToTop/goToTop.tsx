import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

interface GoToTopProps {
  children: React.ReactNode;
}

const GoToTop: React.FC<GoToTopProps> = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    // Before paint, so the new page never shows a frame at the old scroll position
    // Instant, or the root's smooth scroll-behavior animates every page change up from the old position
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return <>{children}</>;
};

export default GoToTop;
