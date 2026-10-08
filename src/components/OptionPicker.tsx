import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface Option<T extends string> { value: T; label: string; }
interface Props<T extends string> {
  label: string; value: T; options: readonly Option<T>[];
  onChange: (value: T) => void; error?: string; disabled?: boolean;
}

export function OptionPicker<T extends string>({ label, value, options, onChange, error, disabled = false }: Props<T>): React.JSX.Element {
  const { colors } = useTheme();
  return <View style={styles.group} accessibilityRole="radiogroup" accessibilityLabel={label}>
    <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    <View style={styles.options}>
      {options.map(option => {
        const selected = option.value === value;
        return <Pressable
          key={option.value}
          accessibilityRole="radio"
          accessibilityLabel={`${label}: ${option.label}`}
          accessibilityState={{ checked: selected, disabled }}
          disabled={disabled}
          onPress={() => onChange(option.value)}
          style={({ pressed }) => [styles.option, { backgroundColor: selected ? colors.primary : colors.surface, borderColor: selected ? colors.primary : colors.border, opacity: disabled ? 0.5 : pressed ? 0.72 : 1 }]}
        >
          <Text style={[styles.optionText, { color: selected ? colors.onPrimary : colors.text }]}>{option.label}</Text>
        </Pressable>;
      })}
    </View>
    {error ? <Text style={[styles.error, { color: colors.danger }]} accessibilityRole="alert">{error}</Text> : null}
  </View>;
}

const styles = StyleSheet.create({
  group: { gap: 8 }, label: { fontSize: 14, fontWeight: '700' }, options: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: { minHeight: 48, borderRadius: 12, borderWidth: 1.5, justifyContent: 'center', paddingHorizontal: 14, paddingVertical: 9 },
  optionText: { fontSize: 14, fontWeight: '700' }, error: { fontSize: 13, lineHeight: 19 },
});
