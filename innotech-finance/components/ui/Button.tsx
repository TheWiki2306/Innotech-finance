import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { ButtonProps } from '../../types/components';
import { colors } from '@/constants/colors';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}) => {
  const getVariantStyles = () => {
    if (disabled || loading) {
      return styles.disabled;
    }

    switch (variant) {
      case 'primary':
        return [styles.primary, { backgroundColor: colors.accent }];
      case 'secondary':
        return [styles.secondary, { backgroundColor: colors.accentDark }];
      case 'outline':
        return [styles.outline, { borderColor: colors.transparent }];
      case 'ghost':
        return styles.ghost;
      case 'danger':
        return [styles.danger, { backgroundColor: colors.error }];
      default:
        return [styles.primary, { backgroundColor: colors.accent }];
    }
  };

  const getTextColor = () => {
    if (disabled || loading) return colors.accentVariant_1;

    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return colors.primary;
      case 'outline':
      case 'ghost':
        return colors.primary;
      default:
        return colors.primary;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getVariantStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <View style={styles.content}>
          <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  danger: {
    backgroundColor: colors.error,
  },
  disabled: {
    backgroundColor: colors.greyVariant_3,
  },
  ghost: {
    backgroundColor: colors.transparent,
  },
  leftIcon: {
    marginRight: 8,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  rightIcon: {
    marginLeft: 8,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  text: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '400',
  },
});
