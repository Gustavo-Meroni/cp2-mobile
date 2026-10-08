import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomButton } from '../../components/CustomButton';
import { useTheme } from '../../hooks/useTheme';
import type { TaskStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskForm'>;

export function TaskFormScreen({ navigation }: Props): React.JSX.Element {
  const { colors } = useTheme();
  return <View style={[styles.screen, { backgroundColor: colors.background }]}>
    <Text style={[styles.title, { color: colors.text }]}>Cadastro de tarefa</Text>
    <Text style={[styles.body, { color: colors.muted }]}>O formulário completo, com validações e salvamento, será implementado na próxima etapa.</Text>
    <CustomButton label="Voltar para tarefas" variant="secondary" onPress={() => navigation.goBack()} />
  </View>;
}

const styles = StyleSheet.create({ screen: { flex: 1, justifyContent: 'center', padding: 24, gap: 18 }, title: { fontSize: 24, fontWeight: '800' }, body: { fontSize: 16, lineHeight: 24 } });
