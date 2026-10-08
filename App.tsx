import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { TaskProvider } from './src/context/TaskContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { useTheme } from './src/hooks/useTheme';

function AppContent(): React.JSX.Element {
  const { mode, colors } = useTheme();
  return <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
    <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
    <View style={styles.content}>
      <Text style={[styles.title, { color: colors.text }]}>TaskFlow</Text>
      <Text style={[styles.caption, { color: colors.muted }]}>Base do aplicativo pronta.</Text>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 34, fontWeight: '800' },
  caption: { fontSize: 16, marginTop: 8 },
});

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
