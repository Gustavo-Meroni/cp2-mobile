import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { TaskStackParamList } from '../types/navigation';
import { useTheme } from '../hooks/useTheme';
import { TaskListScreen } from '../screens/tasks/TaskListScreen';
import { TaskFormScreen } from '../screens/tasks/TaskFormScreen';
import { TaskDetailScreen } from '../screens/tasks/TaskDetailScreen';

const Stack = createNativeStackNavigator<TaskStackParamList>();

export function TaskStackRoutes(): React.JSX.Element {
  const { colors } = useTheme();
  return <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.text, contentStyle: { backgroundColor: colors.background } }}>
    <Stack.Screen name="TaskList" component={TaskListScreen} options={{ headerShown: false }} />
    <Stack.Screen name="TaskForm" component={TaskFormScreen} options={({ route }) => ({ title: route.params?.taskId ? 'Editar tarefa' : 'Nova tarefa' })} />
    <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Detalhes da tarefa' }} />
  </Stack.Navigator>;
}
