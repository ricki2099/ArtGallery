import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParamList } from '../types';
import MainStack from './MainStack';
import HelpScreen from '../screens/HelpScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import ContactScreen from '../screens/ContactScreen';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator<DrawerParamList>();

const RootNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '75%',
          backgroundColor: '#fff',
        },
        overlayColor: 'rgba(0,0,0,0.5)',
      }}>
      <Drawer.Screen name="MainStack" component={MainStack} />
      <Drawer.Screen name="Help" component={HelpScreen} />
      <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
    </Drawer.Navigator>
  );
};

export default RootNavigator;
