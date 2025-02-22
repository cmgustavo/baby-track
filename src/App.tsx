import React, {useEffect} from 'react';
import {useAppDispatch} from './store';
import {initializeApp} from './store/app';
import MainNavigation from './components/main-navigation';

import {PreferencesProvider} from './context/PreferencesContext';
import {initializeBabies} from './store/babies';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
    dispatch(initializeBabies());
  }, []);

  return (
    <PreferencesProvider>
      <MainNavigation />
    </PreferencesProvider>
  );
};

export default App;
