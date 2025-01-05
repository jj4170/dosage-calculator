import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

//navigation
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Orientation from 'react-native-orientation-locker';
import {themeColor, width, height, customFont} from './src/common/common';
import ToastMessage from './src/common/ToastMessage';
import Tabs from './src/container/tabs';
//screens
import Splash from './src/screens/Route/Splash';
import Login from './src/screens/auth/Login';
import Signup from './src/screens/auth/Signup';
import SuccessFull from './src/screens/auth/SuccessFull';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import Home from './src/screens/Route/Home';
import ViewAllPatient from './src/screens/Route/ViewAllPatient';
import PatientDetail from './src/screens/Route/PatientDetail';
import ResultCalculator from './src/screens/Route/ResultCalculator';
import AddPatientDetails from './src/screens/Route/AddPatientDetails';
import Calculator from './src/screens/Route/Calculator';
import Profile from './src/screens/Route/Profile';
import ResultStatement from './src/screens/Route/ResultSatement';
import Disclaimer from './src/screens/Route/Disclaimer';
import PrivacyPolicy from './src/screens/Route/PrivacyPolicy';
// import NoInernetScreen from './src/screens/Route/NoInternetScreen';
//images
import HomeActive from './src/assets/SVG/HomeMainColor.svg';
import HomeImg from './src/assets/SVG/Home.svg';
import {AppProvider} from './src/container/ContextProvider';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  return (
    <>
      <AppProvider>
        <ToastMessage />
        <NavigationContainer>
          <Stack.Navigator initialRouteName={Splash}>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SuccessFull"
              component={SuccessFull}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Disclaimer"
              component={Disclaimer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="PatientDetail"
              component={PatientDetail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddPatientDetails"
              component={AddPatientDetails}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="ResultCalculator"
              component={ResultCalculator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ResultStatement"
              component={ResultStatement}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Calculator"
              component={Calculator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ViewAllPatient"
              component={ViewAllPatient}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicy}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </>
  );
};

const TabNavigator = ({navigation, route}) => {
  return <Tabs />;
};

const styles = StyleSheet.create({});

export default App;
