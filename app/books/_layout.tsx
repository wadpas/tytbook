import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { IconSymbol } from '@/components/ui/IconSymbol'

export default function CategoriesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='[slug]'
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}>
              <IconSymbol
                size={28}
                name='arrow-back'
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name='+not-found' />
    </Stack>
  )
}

const styles = StyleSheet.create({})
