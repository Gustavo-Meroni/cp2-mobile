import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomButton } from '../../components/CustomButton';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import type { TaskStackParamList } from '../../types/navigation';
import { formatDate } from '../../utils/formatDate';
import { priorityLabels, statusLabels } from '../../utils/taskOptions';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskDetail'>;

export function TaskDetailScreen({ route, navigation }: Props): React.JSX.Element {
  const { colors } = useTheme();
  const { tasks } = useTasks();
  const task = tasks.find(item => item.id === route.params.taskId);
  if (!task) return <View style={[styles.screen, { backgroundColor: colors.background }]}><Text style={[styles.body, { color: colors.text }]}>Tarefa não encontrada.</Text><CustomButton label="Voltar" variant="secondary" onPress={() => navigation.goBack()} /></View>;
  return <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.screen}>
    <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
    <Text style={[styles.body, { color: colors.muted }]}>{task.description}</Text>
    <Text style={[styles.detail, { color: colors.text }]}>Status: {statusLabels[task.status]}</Text>
    <Text style={[styles.detail, { color: colors.text }]}>Prioridade: {priorityLabels[task.priority]}</Text>
    <Text style={[styles.detail, { color: colors.text }]}>Categoria: {task.category}</Text>
    <Text style={[styles.detail, { color: colors.muted }]}>Criada: {formatDate(task.createdAt)}</Text>
    <Text style={[styles.detail, { color: colors.muted }]}>Atualizada: {formatDate(task.updatedAt)}</Text>
    <CustomButton label="Voltar para tarefas" variant="secondary" onPress={() => navigation.goBack()} />
  </ScrollView>;
}

const styles = StyleSheet.create({ screen: { flexGrow: 1, padding: 24, gap: 15 }, title: { fontSize: 26, fontWeight: '800' }, body: { fontSize: 16, lineHeight: 24 }, detail: { fontSize: 15, lineHeight: 22 } });
