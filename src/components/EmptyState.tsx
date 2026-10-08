import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';

export function EmptyState({ title, description }: { title: string; description: string }): React.JSX.Element {
  const { colors } = useTheme();
  return <View style={[styles.wrap, { backgroundColor: colors.surface, borderColor: colors.border }]}>
    <Ionicons name="file-tray-outline" size={34} color={colors.primary} accessibilityElementsHidden importantForAccessibility="no-hide-descendants" />
    <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
    <Text style={[styles.description, { color: colors.muted }]}>{description}</Text>
  </View>;
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', borderWidth: 1, borderRadius: 18, padding: 28, gap: 9 },
  title: { fontSize: 19, fontWeight: '800', textAlign: 'center' }, description: { fontSize: 15, lineHeight: 23, textAlign: 'center' },
});
