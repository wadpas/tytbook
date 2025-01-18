import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SymbolWeight } from 'expo-symbols'
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native'

export function IconSymbol({
  name,
  size = 24,
  color = '#000',
}: {
  name: any
  size?: number
  color?: string | OpaqueColorValue
  style?: StyleProp<ViewStyle>
  weight?: SymbolWeight
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={name}
    />
  )
}
