// import { AppRegistry } from 'react-native';
// import App from './App';
// import appConfig from './app.json';
// const appName = appConfig.expo.name;


// import { expo as appName } from './app.json';

// import expo from './app.json';
// const test = expo["name"];

// import { test as appName } from './app.json';

// AppRegistry.registerComponent(appName, () => App);



import { registerRootComponent } from 'expo';
import App from './App';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);