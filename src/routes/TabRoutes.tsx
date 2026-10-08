import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { TabParamList } from '../types/navigation';
import { useTheme } from '../hooks/useTheme';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { TaskStackRoutes } from './TaskStackRoutes';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabRoutes({ initialTab }: { initialTab: keyof TabParamList }): React.JSX.Element {
  const { colors } = useTheme();
  return <Tab.Navigator
    initialRouteName={initialTab}
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.muted,
      tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, minHeight: 64, paddingTop: 6, paddingBottom: 6 },
      tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
      tabBarIcon: ({ color, size, focused }) => {
        const icon = route.name === 'Home' ? (focused ? 'home' : 'home-outline')
          : route.name === 'Tasks' ? (focused ? 'checkbox' : 'checkbox-outline')
          : (focused ? 'settings' : 'settings-outline');
        return <Ionicons name={icon} color={color} size={size} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home', tabBarAccessibilityLabel: 'Aba Home' }} />
    <Tab.Screen name="Tasks" component={TaskStackRoutes} options={{ tabBarLabel: 'Tarefas', tabBarAccessibilityLabel: 'Aba Tarefas' }} />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Configurações', tabBarAccessibilityLabel: 'Aba Configurações' }} />
  </Tab.Navigator>;
}
