import { Tabs } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, Platform } from 'react-native'

import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabLayout() {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width)
  let largeScreen = windowWidth > 1036
  const colorScheme = useColorScheme()

  Dimensions.addEventListener('change', ({ window }) => {
    setWindowWidth(window.width)
  })

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarPosition: largeScreen ? 'top' : 'bottom',
        headerShown: false,
        tabBarLabelStyle: {
          overflow: 'visible',
          textTransform: largeScreen ? 'uppercase' : 'none',
        },
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: 52,
          alignItems: largeScreen ? 'center' : 'stretch',
        },
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Головна',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={largeScreen ? 18 : 28}
              name='home'
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='genres'
        options={{
          title: 'Жанри',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={largeScreen ? 18 : 28}
              name='library-books'
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
