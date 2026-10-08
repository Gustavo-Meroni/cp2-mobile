import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface Props {
  label: string; onPress: () => void; loading?: boolean; disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger'; accessibilityHint?: string;
}

export function CustomButton({ label, onPress, loading = false, disabled = false, variant = 'primary', accessibilityHint }: Props): React.JSX.Element {
  const { colors } = useTheme();
  const solid = variant === 'primary';
  const color = variant === 'danger' ? colors.danger : colors.primary;
  return <Pressable
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityHint={accessibilityHint}
    accessibilityState={{ disabled: disabled || loading, busy: loading }}
    disabled={disabled || loading}
    onPress={onPress}
    style={({ pressed }) => [styles.button, { backgroundColor: solid ? color : colors.surface, borderColor: color, opacity: disabled ? 0.5 : pressed ? 0.72 : 1 }]}
  >
    {loading ? <ActivityIndicator color={solid ? colors.onPrimary : color} /> : <Text style={[styles.label, { color: solid ? colors.onPrimary : color }]}>{label}</Text>}
  </Pressable>;
}

const styles = StyleSheet.create({
  button: { minHeight: 48, borderRadius: 14, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, paddingVertical: 10 },
  label: { fontSize: 16, fontWeight: '700', textAlign: 'center' },
});
