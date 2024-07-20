import { useState, useEffect, useRef } from 'react';

import { DESKTOP_FIRST_BREAKPOINTS } from '../constants/breakpoint';

function getDeviceType(windowSize) {
  switch (true) {
    case windowSize <= DESKTOP_FIRST_BREAKPOINTS.mobileSmall:
      return 'mobileSmall';
    case windowSize <= DESKTOP_FIRST_BREAKPOINTS.mobile:
      return 'mobile';
    case windowSize <= DESKTOP_FIRST_BREAKPOINTS.tablet:
      return 'tablet';
    case windowSize <= DESKTOP_FIRST_BREAKPOINTS.desktopSmall:
      return 'desktopSmall';
    case windowSize <= DESKTOP_FIRST_BREAKPOINTS.desktop:
      return 'desktop';

    default:
      return 'desktopLarge';
  }
}

function useScreen() {
  const prevWindowSize = useRef(undefined);

  const [windowSize, setWindowSize] = useState(window?.innerWidth);

  function getWindowSize() {
    if (window && window.innerWidth) {
      return window.innerWidth;
    }

    return undefined;
  }

  useEffect(() => {
    function handleResize() {
      if (window?.innerWidth !== prevWindowSize.current) {
        const currentWindowSize = getWindowSize();
        prevWindowSize.current = currentWindowSize;
        setWindowSize(currentWindowSize);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    type: getDeviceType(windowSize),
    windowSize,
    isMobile: windowSize <= DESKTOP_FIRST_BREAKPOINTS.mobile,
    isTablet: getDeviceType(windowSize) === 'tablet',
  };
}

export default useScreen;
