import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function GenresLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='[slug]'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='+not-found' />
    </Stack>
  )
}

const styles = StyleSheet.create({})
