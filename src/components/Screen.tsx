import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';

export function Screen({ children }: { children: React.ReactNode }): React.JSX.Element {
  const { colors } = useTheme();
  return <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: colors.background }}>{children}</SafeAreaView>;
}
