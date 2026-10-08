import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { TaskProvider } from './src/context/TaskContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { AppRoutes } from './src/routes/AppRoutes';
import { useTheme } from './src/hooks/useTheme';

function AppContent(): React.JSX.Element {
  const { mode } = useTheme();
  return <><StatusBar style={mode === 'dark' ? 'light' : 'dark'} /><AppRoutes /></>;
}

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <TaskProvider>
            <AppContent />
          </TaskProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
