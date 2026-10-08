import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export type TaskFilter = 'todas' | 'pendente' | 'concluida';
const filters: readonly { value: TaskFilter; label: string }[] = [
  { value: 'todas', label: 'Todas' }, { value: 'pendente', label: 'Pendentes' }, { value: 'concluida', label: 'Concluídas' },
];

export function FilterBar({ value, onChange }: { value: TaskFilter; onChange: (value: TaskFilter) => void }): React.JSX.Element {
  const { colors } = useTheme();
  return <View style={styles.bar} accessibilityRole="radiogroup" accessibilityLabel="Filtrar tarefas por status">
    {filters.map(filter => {
      const selected = value === filter.value;
      return <Pressable
        key={filter.value}
        accessibilityRole="radio"
        accessibilityLabel={`Filtro ${filter.label}`}
        accessibilityState={{ checked: selected }}
        onPress={() => onChange(filter.value)}
        style={({ pressed }) => [styles.chip, { backgroundColor: selected ? colors.primary : colors.surface, borderColor: selected ? colors.primary : colors.border, opacity: pressed ? 0.72 : 1 }]}
      >
        <Text style={[styles.text, { color: selected ? colors.onPrimary : colors.text }]}>{filter.label}</Text>
      </Pressable>;
    })}
  </View>;
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { minHeight: 48, borderRadius: 99, borderWidth: 1.5, paddingHorizontal: 14, justifyContent: 'center' },
  text: { fontSize: 13, fontWeight: '700' },
});
