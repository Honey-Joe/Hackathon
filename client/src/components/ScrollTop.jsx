import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top-left corner
  }, [location.pathname]); // Run when the path changes

  return null; // No UI rendering required
};

export default ScrollToTop;
