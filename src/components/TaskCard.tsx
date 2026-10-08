import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Task } from '../types/task';
import { useTheme } from '../hooks/useTheme';
import { formatDate } from '../utils/formatDate';
import { priorityLabels, statusLabels } from '../utils/taskOptions';

export function TaskCard({ task, onPress }: { task: Task; onPress: () => void }): React.JSX.Element {
  const { colors } = useTheme();
  const icon = task.category === 'Trabalho' ? 'briefcase-outline' : task.category === 'Estudos' ? 'book-outline'
    : task.category === 'Pessoal' ? 'person-outline' : task.category === 'Saúde' ? 'fitness-outline' : 'grid-outline';
  const statusColor = task.status === 'concluida' ? colors.done : task.status === 'em_andamento' ? colors.progress : colors.pending;
  const priorityColor = task.priority === 'alta' ? colors.high : task.priority === 'media' ? colors.medium : colors.low;
  return <Pressable
    accessibilityRole="button"
    accessibilityLabel={`Abrir tarefa ${task.title}, ${statusLabels[task.status]}`}
    accessibilityHint="Abre os detalhes da tarefa"
    onPress={onPress}
    style={({ pressed }) => [styles.card, { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.72 : 1 }]}
  >
    <View style={styles.top}>
      <View style={[styles.icon, { backgroundColor: colors.surfaceAlt }]}><Ionicons name={icon} size={23} color={colors.primary} /></View>
      <View style={styles.main}><Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{task.title}</Text><Text style={[styles.category, { color: colors.muted }]}>{task.category}</Text></View>
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </View>
    <View style={styles.tags}><Text style={[styles.tag, { color: statusColor, borderColor: statusColor }]}>{statusLabels[task.status]}</Text><Text style={[styles.tag, { color: priorityColor, borderColor: priorityColor }]}>Prioridade {priorityLabels[task.priority]}</Text></View>
    <Text style={[styles.date, { color: colors.muted }]}>Criada: {formatDate(task.createdAt)}</Text>
    <Text style={[styles.date, { color: colors.muted }]}>Atualizada: {formatDate(task.updatedAt)}</Text>
  </Pressable>;
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, borderWidth: 1, padding: 16, gap: 10 }, top: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: { width: 46, height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  main: { flex: 1, gap: 3 }, title: { fontSize: 17, fontWeight: '800' }, category: { fontSize: 13 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 }, tag: { borderWidth: 1, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4, fontSize: 12, fontWeight: '700' },
  date: { fontSize: 12 },
});
