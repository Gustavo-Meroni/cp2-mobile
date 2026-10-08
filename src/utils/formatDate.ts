export function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Data indisponível' : date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}
