import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface BaseComponentProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface ButtonProps extends BaseComponentProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface CardProps extends BaseComponentProps {
  padding?: number;
  elevated?: boolean;
  backgroundColor?: string;
}
