import React, {useState, createContext, useContext} from 'react';
import Home from '../screens/Route/Home';
import Profile from '../screens/Route/Profile';

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [isImageProfile, setImageProfile] = useState('');
  const [isPatientUpdate, setPatientUpdate] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isImageProfile,
        setImageProfile,
        isPatientUpdate,
        setPatientUpdate,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider, AppContext};
