import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { driver, DriveStep } from 'driver.js';
import 'driver.js/dist/driver.css';

const OnboardingController = () => {
  const location = useLocation();

  useEffect(() => {
    // Only trigger the tour on the absolute Home page
    if (location.pathname !== '/') return;

    // Check if they've already taken the tour
    const tourCompleted = localStorage.getItem('aic_tour_completed');
    if (tourCompleted === 'true') return;

    // We delay the tour by 3 seconds so they can take in the Hero section first
    const timer = setTimeout(() => {
      const isMobile = window.innerWidth < 1024;
      
      const desktopSteps: DriveStep[] = [
        {
          element: '#tour-menu',
          popover: {
            title: 'Welcome to AIC Happy Valley!',
            description: 'This is your digital sanctuary. Here you can explore our ministries, read about our mission, and engage with the community.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#tour-bible',
          popover: {
            title: 'The Offline Bible',
            description: 'Read the complete Word of God in English and Swahili. Once loaded, it works completely without the internet!',
            side: 'bottom',
            align: 'center'
          }
        },
        {
          element: '#tour-daily',
          popover: {
            title: 'Daily Word',
            description: 'Start your morning strong. Check back here every day for fresh scriptural inspiration to fuel your faith.',
            side: 'bottom',
            align: 'center'
          }
        },
        {
          element: '#tour-fab',
          popover: {
            title: 'Install the Official App',
            description: 'Want a continuous native experience? Tap this button to install the AIC Church App directly to your Android, iOS, or PC home screen!',
            side: 'top',
            align: 'end'
          }
        }
      ];

      const mobileSteps: DriveStep[] = [
        {
          element: '#mobile-menu-btn',
          popover: {
            title: 'Welcome to AIC Happy Valley!',
            description: 'Tap this menu to access your Ministries, the Offline Bible, and your Daily Word devotionals!',
            side: 'bottom',
            align: 'end'
          }
        },
        {
          element: '#tour-fab',
          popover: {
            title: 'Get the Native App',
            description: 'Tap this floating button to install the official app to your phone for a lightning-fast experience!',
            side: 'top',
            align: 'end'
          }
        }
      ];

      const driverObj = driver({
        showProgress: true,
        animate: true,
        allowClose: true,
        overlayColor: 'rgba(23, 37, 84, 0.85)', // Cinematic deep blue
        doneBtnText: 'Finish',
        nextBtnText: 'Next',
        prevBtnText: 'Previous',
        onDestroyed: () => {
          localStorage.setItem('aic_tour_completed', 'true');
        },
        steps: isMobile ? mobileSteps : desktopSteps
      });

      driverObj.drive();
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

export default OnboardingController;
