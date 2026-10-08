import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../../components/CustomButton';
import { Header } from '../../components/Header';
import { Screen } from '../../components/Screen';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { fetchQuote, type QuoteResponse } from '../../services/api';
import type { TabParamList } from '../../types/navigation';

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const { colors } = useTheme();
  const { tasks } = useTasks();
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadQuote(): Promise<void> {
    setLoading(true); setError(null);
    try { setQuote(await fetchQuote()); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Falha ao buscar a frase.'); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    let active = true;
    fetchQuote().then(result => { if (active) setQuote(result); })
      .catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : 'Falha ao buscar a frase.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const pending = tasks.filter(task => task.status === 'pendente').length;
  const done = tasks.filter(task => task.status === 'concluida').length;
  return <Screen>
    <Header title="Home" />
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={[styles.eyebrow, { color: colors.primary }]}>SEU ESPAÇO</Text>
      <Text style={[styles.heading, { color: colors.text }]}>Um passo de cada vez.</Text>
      <Text style={[styles.body, { color: colors.muted }]}>Acompanhe o que importa e mantenha o foco no próximo passo.</Text>
      <View style={styles.metrics}>
        <View style={[styles.metric, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.metricNumber, { color: colors.text }]}>{tasks.length}</Text><Text style={[styles.metricLabel, { color: colors.muted }]}>Total</Text></View>
        <View style={[styles.metric, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.metricNumber, { color: colors.pending }]}>{pending}</Text><Text style={[styles.metricLabel, { color: colors.muted }]}>Pendentes</Text></View>
        <View style={[styles.metric, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.metricNumber, { color: colors.done }]}>{done}</Text><Text style={[styles.metricLabel, { color: colors.muted }]}>Concluídas</Text></View>
      </View>
      <CustomButton label="Ver tarefas" onPress={() => navigation.navigate('Tasks')} accessibilityHint="Abre a aba Tarefas" />
      <View style={[styles.quote, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}>
        <View style={styles.quoteTitle}><Ionicons name="sparkles-outline" size={22} color={colors.primary} /><Text style={[styles.sectionTitle, { color: colors.text }]}>Inspiração do dia</Text></View>
        {loading ? <ActivityIndicator color={colors.primary} accessibilityLabel="Carregando frase" />
          : error ? <><Text style={[styles.body, { color: colors.danger }]} accessibilityRole="alert">{error}</Text><CustomButton label="Tentar novamente" variant="secondary" onPress={() => { void loadQuote(); }} /></>
          : quote ? <><Text style={[styles.quoteText, { color: colors.text }]}>“{quote.quote}”</Text><Text style={[styles.author, { color: colors.muted }]}>— {quote.author}</Text><CustomButton label="Outra frase" variant="secondary" onPress={() => { void loadQuote(); }} /></> : null}
      </View>
    </ScrollView>
  </Screen>;
}

const styles = StyleSheet.create({
  content: { alignSelf: 'center', width: '100%', maxWidth: 700, padding: 20, paddingBottom: 36, gap: 16 },
  eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 1.5 }, heading: { fontSize: 30, fontWeight: '800', lineHeight: 37 },
  body: { fontSize: 16, lineHeight: 24 }, metrics: { flexDirection: 'row', gap: 8, marginVertical: 8 },
  metric: { flex: 1, minWidth: 0, borderWidth: 1, borderRadius: 16, padding: 12, gap: 3 },
  metricNumber: { fontSize: 25, fontWeight: '800' }, metricLabel: { fontSize: 12, fontWeight: '600' },
  quote: { borderWidth: 1, borderRadius: 20, padding: 20, gap: 16, marginTop: 12 }, quoteTitle: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 19, fontWeight: '800' }, quoteText: { fontSize: 19, lineHeight: 28, fontWeight: '600' },
  author: { fontSize: 14, textAlign: 'right' },
});
