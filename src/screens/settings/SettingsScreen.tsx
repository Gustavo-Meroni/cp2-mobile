import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Header } from '../../components/Header';
import { Screen } from '../../components/Screen';
import { CustomButton } from '../../components/CustomButton';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import type { Treatment } from '../../types/user';

const treatments: readonly Treatment[] = ['Sr.', 'Sra.', 'Srta.'];

export function SettingsScreen(): React.JSX.Element {
  const { user } = useAuth();
  const { colors, mode, treatment, toggleTheme, setTreatment, error } = useTheme();
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function changeTheme(): Promise<void> {
    setBusy(true); setFeedback(null);
    try { await toggleTheme(); setFeedback('Tema salvo com sucesso.'); }
    catch { /* ThemeContext expõe a mensagem de erro. */ }
    finally { setBusy(false); }
  }

  async function changeTreatment(value: Treatment): Promise<void> {
    setBusy(true); setFeedback(null);
    try { await setTreatment(value); setFeedback('Tratamento salvo com sucesso.'); }
    catch { /* ThemeContext expõe a mensagem de erro. */ }
    finally { setBusy(false); }
  }

  return <Screen>
    <Header title="Configurações" />
    <ScrollView contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.heading, { color: colors.text }]}>Sua conta</Text>
        <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
        <Text style={[styles.secondary, { color: colors.muted }]}>Perfil: {user?.role === 'admin' ? 'Administrador' : 'Usuário comum'}</Text>
        <Text style={[styles.secondary, { color: colors.muted }]}>Usuário: {user?.username}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.heading, { color: colors.text }]}>Aparência</Text>
        <View style={styles.row}>
          <View style={styles.rowText}><Text style={[styles.name, { color: colors.text }]}>Tema escuro</Text><Text style={[styles.secondary, { color: colors.muted }]}>Preferência salva neste aparelho</Text></View>
          <Switch value={mode === 'dark'} disabled={busy} onValueChange={() => { void changeTheme(); }} trackColor={{ false: colors.border, true: colors.primary }} thumbColor={colors.surface} accessibilityLabel="Alternar tema escuro" accessibilityRole="switch" />
        </View>
      </View>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.heading, { color: colors.text }]}>Como prefere ser chamado?</Text>
        <Text style={[styles.secondary, { color: colors.muted }]}>Escolha um tratamento para o cabeçalho.</Text>
        <View style={styles.choices}>
          {treatments.map(value => <View key={value} style={styles.choice}><CustomButton label={value} variant={treatment === value ? 'primary' : 'secondary'} disabled={busy} onPress={() => { void changeTreatment(value); }} /></View>)}
        </View>
      </View>
      {busy ? <ActivityIndicator color={colors.primary} accessibilityLabel="Salvando preferência" /> : null}
      {error ? <Text style={[styles.message, { color: colors.danger }]} accessibilityRole="alert">{error}</Text> : feedback ? <Text style={[styles.message, { color: colors.done }]}>{feedback}</Text> : null}
    </ScrollView>
  </Screen>;
}

const styles = StyleSheet.create({
  content: { alignSelf: 'center', width: '100%', maxWidth: 700, padding: 20, paddingBottom: 36, gap: 18 },
  card: { borderWidth: 1, borderRadius: 18, padding: 20, gap: 10 }, heading: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '700' }, secondary: { fontSize: 14, lineHeight: 20 }, row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowText: { flex: 1, gap: 3 }, choices: { flexDirection: 'row', gap: 8, marginTop: 8 }, choice: { flex: 1 },
  message: { fontSize: 14, textAlign: 'center', lineHeight: 21 },
});
