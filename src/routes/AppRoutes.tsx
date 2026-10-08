import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer, type Theme as NavigationTheme } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { TabRoutes } from './TabRoutes';

export function AppRoutes(): React.JSX.Element {
  const { user, loading: authLoading } = useAuth();
  const { colors, mode, loading: themeLoading } = useTheme();
  const navigationTheme: NavigationTheme = {
    dark: mode === 'dark',
    colors: { primary: colors.primary, background: colors.background, card: colors.surface, text: colors.text, border: colors.border, notification: colors.accent },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' },
      medium: { fontFamily: 'System', fontWeight: '500' },
      bold: { fontFamily: 'System', fontWeight: '700' },
      heavy: { fontFamily: 'System', fontWeight: '800' },
    },
  };

  if (authLoading || themeLoading) return <View style={[styles.loading, { backgroundColor: colors.background }]}><ActivityIndicator size="large" color={colors.primary} accessibilityLabel="Carregando aplicativo" /></View>;
  return <NavigationContainer theme={navigationTheme}>
    {user ? <TabRoutes key={user.id} initialTab={user.role === 'admin' ? 'Settings' : 'Home'} /> : <LoginScreen />}
  </NavigationContainer>;
}

const styles = StyleSheet.create({ loading: { flex: 1, alignItems: 'center', justifyContent: 'center' } });
