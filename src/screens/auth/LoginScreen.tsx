import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

export function LoginScreen(): React.JSX.Element {
  const { login, error: authError } = useAuth();
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(): Promise<void> {
    if (!username.trim() || !password) { setError('Preencha usuário e senha.'); return; }
    setError(null); setSubmitting(true);
    try { await login(username, password); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Não foi possível entrar. Tente novamente.'); }
    finally { setSubmitting(false); }
  }

  return <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={[styles.mark, { backgroundColor: colors.surfaceAlt }]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <Ionicons name="checkmark-done" size={40} color={colors.primary} />
        </View>
        <Text style={[styles.heading, { color: colors.text }]}>Organize seu dia.</Text>
        <Text style={[styles.subheading, { color: colors.muted }]}>Entre no TaskFlow para acompanhar suas tarefas.</Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Entrar na conta</Text>
          <CustomInput label="Usuário" value={username} onChangeText={setUsername} autoCapitalize="none" autoComplete="username" textContentType="username" returnKeyType="next" placeholder="admin ou user" />
          <CustomInput label="Senha" value={password} onChangeText={setPassword} secureTextEntry autoComplete="password" textContentType="password" returnKeyType="go" onSubmitEditing={() => { void handleLogin(); }} placeholder="Digite sua senha" />
          {(error || authError) ? <Text style={[styles.error, { color: colors.danger }]} accessibilityRole="alert">{error || authError}</Text> : null}
          <CustomButton label="Entrar" loading={submitting} onPress={() => { void handleLogin(); }} />
        </View>
        <Text style={[styles.tip, { color: colors.muted }]}>Acesso de demonstração: admin / 123 ou user / 123</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, flex: { flex: 1 }, content: { flexGrow: 1, justifyContent: 'center', padding: 24, gap: 12, alignSelf: 'center', width: '100%', maxWidth: 520 },
  mark: { width: 72, height: 72, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  heading: { fontSize: 31, lineHeight: 38, fontWeight: '800' }, subheading: { fontSize: 16, lineHeight: 24, marginBottom: 14 },
  card: { borderRadius: 20, borderWidth: 1, padding: 20, gap: 18 }, cardTitle: { fontSize: 21, fontWeight: '800' },
  error: { fontSize: 14, lineHeight: 20 }, tip: { fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 8 },
});
