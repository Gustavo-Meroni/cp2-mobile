import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

interface Props { title: string; }

export function Header({ title }: Props): React.JSX.Element {
  const { user, logout } = useAuth();
  const { colors, treatment } = useTheme();
  const [busy, setBusy] = useState(false);
  async function handleLogout(): Promise<void> {
    setBusy(true);
    try { await logout(); }
    catch { Alert.alert('Erro ao sair', 'Não foi possível encerrar a sessão. Tente novamente.'); }
    finally { setBusy(false); }
  }
  return <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
    <View style={styles.identity}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]} numberOfLines={1}>
        {treatment ? `${treatment} ` : ''}{user?.name} · {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
      </Text>
    </View>
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Sair da conta"
      accessibilityHint="Encerra a sessão e volta para o login"
      accessibilityState={{ disabled: busy }}
      disabled={busy}
      onPress={() => { void handleLogout(); }}
      style={({ pressed }) => [styles.logout, { borderColor: colors.border, opacity: pressed ? 0.65 : 1 }]}
    >
      <Ionicons name="log-out-outline" size={22} color={colors.danger} />
    </Pressable>
  </View>;
}

const styles = StyleSheet.create({
  header: { minHeight: 80, paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  identity: { flex: 1, gap: 3 }, title: { fontSize: 21, fontWeight: '800' }, subtitle: { fontSize: 13 },
  logout: { width: 48, height: 48, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});
