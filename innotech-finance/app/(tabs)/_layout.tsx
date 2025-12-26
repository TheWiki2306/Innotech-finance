import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';

import homeIcon from '../../assets/icons/home.png';
import sendIcon from '../../assets/icons/send.png';
import accountIcon from '../../assets/icons/account.png';
import profileIcon from '../../assets/icons/profile.png';

const BottomTabsLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.greyVariant_4,
          tabBarStyle: {
            backgroundColor: colors.primary,
            borderTopWidth: 1,
            borderTopColor: colors.greyVariant_4,
            elevation: 0,
            height: 55 + insets.bottom,
            paddingTop: 12,
            position: 'absolute',

            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '400',
            height: 13,
            marginTop: 2,
          },
          tabBarItemStyle: {
            // paddingVertical: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <Image
                  source={homeIcon}
                  style={[styles.icon, { tintColor: focused ? color : colors.greyVariant_4 }]}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="send"
          options={{
            title: 'Send',
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <Image
                  source={sendIcon}
                  style={[styles.icon, { tintColor: focused ? color : colors.greyVariant_4 }]}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="accounts"
          options={{
            title: 'Acounts',
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <Image
                  source={accountIcon}
                  style={[styles.icon, { tintColor: focused ? color : colors.greyVariant_4 }]}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.iconContainer}>
                <Image
                  source={profileIcon}
                  style={[styles.icon, { tintColor: focused ? color : colors.greyVariant_4 }]}
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 70,
    height: 70,

    justifyContent: 'center',
    left: '50%',
    marginLeft: -32, // Half of width to center
    position: 'absolute',
    width: 70,
    zIndex: 1000,
  },
  icon: {
    height: 24,
    resizeMode: 'contain',
    width: 24,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabsLayout;
