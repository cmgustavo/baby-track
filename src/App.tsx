import React, {useEffect} from 'react';
import {useAppDispatch} from './store';
import {initializeApp} from './store/app';
import MainNavigation from './components/main-navigation';

import {PreferencesProvider} from './context/PreferencesContext';
import {initializeBabies} from './store/babies';
import {initializeAppointments} from './store/appointments';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
    dispatch(initializeBabies());
    dispatch(initializeAppointments());
  }, []);

  return (
    <PreferencesProvider>
      <MainNavigation />
    </PreferencesProvider>
  );
};

export default App;
