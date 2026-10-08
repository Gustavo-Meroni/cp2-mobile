export interface QuoteResponse { id: number; quote: string; author: string; }

export async function fetchQuote(): Promise<QuoteResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch('https://dummyjson.com/quotes/random', { signal: controller.signal });
    if (!response.ok) throw new Error('Não foi possível buscar a frase. Tente novamente.');
    const data: unknown = await response.json();
    if (typeof data !== 'object' || data === null || !('quote' in data) || typeof data.quote !== 'string' ||
        !('author' in data) || typeof data.author !== 'string' || !('id' in data) || typeof data.id !== 'number') {
      throw new Error('A API retornou uma resposta inesperada.');
    }
    return { id: data.id, quote: data.quote, author: data.author };
  } catch (reason) {
    if (reason instanceof Error && (reason.message.startsWith('Não foi possível buscar') || reason.message.startsWith('A API retornou'))) throw reason;
    throw new Error('Sem conexão com a API de frases. Verifique sua internet e tente novamente.');
  } finally {
    clearTimeout(timeout);
  }
}
