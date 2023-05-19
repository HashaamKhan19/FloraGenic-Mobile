/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import AuthProvider from './src/context/authContext';

export default function Main() {
  return (
    <AuthProvider>
      <AlertNotificationRoot theme="light" colors={[IColors]}>
        <NavigationContainer>
          <PaperProvider>
            <App />
          </PaperProvider>
        </NavigationContainer>
      </AlertNotificationRoot>
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
