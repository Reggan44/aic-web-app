import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'instant' ensures we move to the top before the new page renders fully
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
