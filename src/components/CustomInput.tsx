import React from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface Props extends TextInputProps { label: string; error?: string; hint?: string; }

export function CustomInput({ label, error, hint, style, ...props }: Props): React.JSX.Element {
  const { colors } = useTheme();
  return <View style={styles.wrap}>
    <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    <TextInput
      {...props}
      accessibilityLabel={label}
      accessibilityHint={hint}
      placeholderTextColor={colors.muted}
      selectionColor={colors.primary}
      style={[styles.input, { color: colors.text, backgroundColor: colors.surface, borderColor: error ? colors.danger : colors.border }, style]}
    />
    {error ? <Text style={[styles.helper, { color: colors.danger }]} accessibilityRole="alert">{error}</Text> : hint ? <Text style={[styles.helper, { color: colors.muted }]}>{hint}</Text> : null}
  </View>;
}

const styles = StyleSheet.create({
  wrap: { gap: 7 }, label: { fontSize: 14, fontWeight: '700' },
  input: { minHeight: 50, borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 14, fontSize: 16 },
  helper: { fontSize: 13, lineHeight: 19 },
});
