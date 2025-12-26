import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CardProps } from '../../types/components';
import { colors } from '@/constants/colors';

export const Card: React.FC<CardProps> = ({
  children,
  padding,
  backgroundColor,
  elevated = false,
  style,
}) => {
  return (
    <View
      style={[
        styles.card,
        elevated && styles.elevated,
        padding !== undefined && { padding },
        backgroundColor && { backgroundColor },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    marginHorizontal: 'auto',
    marginVertical: 8,
  },
  elevated: {
    backgroundColor: colors.primary,
    // iOS shadow - centered around the card
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 0, // Centered shadow (no offset)
    },
    shadowOpacity: 0.08,
    shadowRadius: 12, // Spreads evenly around all sides
    // Android shadow
    elevation: 4,
  },
});
