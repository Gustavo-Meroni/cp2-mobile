import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomButton } from '../../components/CustomButton';
import { EmptyState } from '../../components/EmptyState';
import { FilterBar, type TaskFilter } from '../../components/FilterBar';
import { Header } from '../../components/Header';
import { Screen } from '../../components/Screen';
import { TaskCard } from '../../components/TaskCard';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import type { TaskStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskList'>;

export function TaskListScreen({ navigation }: Props): React.JSX.Element {
  const { tasks, loading, error, reload } = useTasks();
  const { colors } = useTheme();
  const [filter, setFilter] = useState<TaskFilter>('todas');
  const visibleTasks = tasks.filter(task => filter === 'todas' || task.status === filter)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return <Screen>
    <Header title="Tarefas" />
    {loading ? <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} accessibilityLabel="Carregando tarefas" /></View>
      : error ? <View style={styles.center}><Text style={[styles.message, { color: colors.danger }]} accessibilityRole="alert">{error}</Text><CustomButton label="Tentar novamente" onPress={() => { void reload(); }} /></View>
      : <FlatList
        data={visibleTasks}
        keyExtractor={task => task.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<View style={styles.intro}><Text style={[styles.heading, { color: colors.text }]}>Minhas tarefas</Text><Text style={[styles.count, { color: colors.muted }]}>{tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'} no total</Text><CustomButton label="Nova tarefa" onPress={() => navigation.navigate('TaskForm', {})} /><FilterBar value={filter} onChange={setFilter} /></View>}
        ListEmptyComponent={<EmptyState
          title={tasks.length === 0 ? 'Tudo pronto para começar' : 'Nenhuma tarefa neste filtro'}
          description={tasks.length === 0 ? 'Crie sua primeira tarefa para começar a organizar o dia.' : 'Experimente outro filtro para encontrar suas tarefas.'}
        />}
        renderItem={({ item }) => <TaskCard task={item} onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />}
  </Screen>;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 18 },
  list: { alignSelf: 'center', width: '100%', maxWidth: 700, padding: 20, paddingBottom: 36, flexGrow: 1 },
  intro: { gap: 12, marginBottom: 20 }, heading: { fontSize: 27, fontWeight: '800' }, message: { fontSize: 15, lineHeight: 23, textAlign: 'center' }, count: { fontSize: 15 },
  separator: { height: 12 },
});
