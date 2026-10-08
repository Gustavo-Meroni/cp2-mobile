import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { OptionPicker } from '../../components/OptionPicker';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import type { TaskInput, TaskStatus, TaskPriority, TaskCategory } from '../../types/task';
import type { TaskStackParamList } from '../../types/navigation';
import { categories, priorities, priorityLabels, statuses, statusLabels } from '../../utils/taskOptions';
import { validateTask, type TaskErrors } from '../../utils/validation';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskForm'>;
const statusOptions = statuses.map(value => ({ value, label: statusLabels[value] }));
const priorityOptions = priorities.map(value => ({ value, label: priorityLabels[value] }));
const categoryOptions = categories.map(value => ({ value, label: value }));

export function TaskFormScreen({ navigation, route }: Props): React.JSX.Element {
  const { tasks, createTask, updateTask, saving } = useTasks();
  const { colors } = useTheme();
  const taskId = route.params?.taskId;
  const existing = taskId ? tasks.find(task => task.id === taskId) : undefined;
  const [input, setInput] = useState<TaskInput>(() => existing
    ? { title: existing.title, description: existing.description, status: existing.status, priority: existing.priority, category: existing.category }
    : { title: '', description: '', status: 'pendente', priority: 'media', category: 'Pessoal' });
  const [errors, setErrors] = useState<TaskErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  function change<K extends keyof TaskInput>(key: K, value: TaskInput[K]): void {
    setInput(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
    setSubmitError(null);
  }

  async function handleSave(): Promise<void> {
    const found = validateTask(input);
    setErrors(found);
    if (Object.keys(found).length > 0) { setSubmitError('Revise os campos destacados antes de salvar.'); return; }
    setSubmitError(null);
    try {
      if (taskId) {
        await updateTask(taskId, input);
        navigation.goBack();
        Alert.alert('Tarefa atualizada', 'As alterações foram salvas neste aparelho.');
      } else {
        const created = await createTask(input);
        navigation.replace('TaskDetail', { taskId: created.id });
        Alert.alert('Tarefa criada', 'Sua tarefa foi salva neste aparelho.');
      }
    } catch (reason) {
      setSubmitError(reason instanceof Error ? reason.message : 'Não foi possível salvar a tarefa. Tente novamente.');
    }
  }

  if (taskId && !existing) return <View style={[styles.missing, { backgroundColor: colors.background }]}>
    <Text style={[styles.heading, { color: colors.text }]}>Tarefa não encontrada</Text>
    <Text style={[styles.body, { color: colors.muted }]}>Ela pode ter sido excluída ou não pertencer à sua conta.</Text>
    <CustomButton label="Voltar" variant="secondary" onPress={() => navigation.goBack()} />
  </View>;

  return <KeyboardAvoidingView style={[styles.screen, { backgroundColor: colors.background }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={[styles.heading, { color: colors.text }]}>{taskId ? 'Editar tarefa' : 'Nova tarefa'}</Text>
      <Text style={[styles.body, { color: colors.muted }]}>Preencha os dados para organizar sua próxima atividade.</Text>
      <CustomInput label="Título" value={input.title} onChangeText={value => change('title', value)} placeholder="Ex.: Revisar conteúdo da prova" maxLength={100} error={errors.title} hint="Pelo menos 3 caracteres" editable={!saving} />
      <CustomInput label="Descrição" value={input.description} onChangeText={value => change('description', value)} placeholder="Descreva o que precisa ser feito" multiline textAlignVertical="top" style={styles.description} maxLength={1000} error={errors.description} hint="Pelo menos 5 caracteres" editable={!saving} />
      <OptionPicker<TaskStatus> label="Status" value={input.status} options={statusOptions} onChange={value => change('status', value)} error={errors.status} disabled={saving} />
      <OptionPicker<TaskPriority> label="Prioridade" value={input.priority} options={priorityOptions} onChange={value => change('priority', value)} error={errors.priority} disabled={saving} />
      <OptionPicker<TaskCategory> label="Categoria" value={input.category} options={categoryOptions} onChange={value => change('category', value)} error={errors.category} disabled={saving} />
      {submitError ? <Text style={[styles.error, { color: colors.danger }]} accessibilityRole="alert">{submitError}</Text> : null}
      <CustomButton label={taskId ? 'Salvar alterações' : 'Criar tarefa'} loading={saving} onPress={() => { void handleSave(); }} />
      <CustomButton label="Cancelar" variant="secondary" disabled={saving} onPress={() => navigation.goBack()} />
    </ScrollView>
  </KeyboardAvoidingView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, content: { alignSelf: 'center', width: '100%', maxWidth: 700, padding: 20, paddingBottom: 40, gap: 18 },
  heading: { fontSize: 27, fontWeight: '800' }, body: { fontSize: 15, lineHeight: 23 },
  description: { minHeight: 112, paddingTop: 13 }, error: { fontSize: 14, lineHeight: 21 },
  missing: { flex: 1, justifyContent: 'center', padding: 24, gap: 18 },
});
