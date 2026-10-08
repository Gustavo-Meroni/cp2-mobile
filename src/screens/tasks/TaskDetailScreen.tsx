import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
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
  const { tasks, deleteTask, saving } = useTasks();
  const [error, setError] = useState<string | null>(null);
  const task = tasks.find(item => item.id === route.params.taskId);

  async function performDelete(): Promise<void> {
    setError(null);
    try {
      await deleteTask(route.params.taskId);
      navigation.goBack();
      Alert.alert('Tarefa excluída', 'A tarefa foi removida deste aparelho.');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Não foi possível excluir a tarefa.');
    }
  }

  function confirmDelete(): void {
    Alert.alert('Excluir tarefa?', `Deseja excluir “${task?.title ?? 'esta tarefa'}”? Esta ação não pode ser desfeita.`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => { void performDelete(); } },
    ]);
  }

  if (!task) return <View style={[styles.screen, { backgroundColor: colors.background }]}><Text style={[styles.body, { color: colors.text }]}>Tarefa não encontrada.</Text><CustomButton label="Voltar" variant="secondary" onPress={() => navigation.goBack()} /></View>;
  return <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.screen}>
    <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
    <Text style={[styles.body, { color: colors.muted }]}>{task.description}</Text>
    <Text style={[styles.detail, { color: colors.text }]}>Status: {statusLabels[task.status]}</Text>
    <Text style={[styles.detail, { color: colors.text }]}>Prioridade: {priorityLabels[task.priority]}</Text>
    <Text style={[styles.detail, { color: colors.text }]}>Categoria: {task.category}</Text>
    <Text style={[styles.detail, { color: colors.muted }]}>Criada: {formatDate(task.createdAt)}</Text>
    <Text style={[styles.detail, { color: colors.muted }]}>Atualizada: {formatDate(task.updatedAt)}</Text>
    {error ? <Text style={[styles.error, { color: colors.danger }]} accessibilityRole="alert">{error}</Text> : null}
    <View style={styles.actions}>
      <CustomButton label="Editar tarefa" disabled={saving} onPress={() => navigation.navigate('TaskForm', { taskId: task.id })} />
      <CustomButton label="Excluir tarefa" variant="danger" loading={saving} onPress={confirmDelete} accessibilityHint="Solicita confirmação antes de excluir" />
    </View>
  </ScrollView>;
}

const styles = StyleSheet.create({ screen: { flexGrow: 1, padding: 24, gap: 15, alignSelf: 'center', width: '100%', maxWidth: 700 }, title: { fontSize: 26, fontWeight: '800' }, body: { fontSize: 16, lineHeight: 24 }, detail: { fontSize: 15, lineHeight: 22 }, actions: { gap: 10, marginTop: 16 }, error: { fontSize: 14, lineHeight: 21 } });
