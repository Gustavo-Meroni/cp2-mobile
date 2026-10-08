export interface QuoteResponse { id: number; quote: string; author: string; }

export async function fetchQuote(): Promise<QuoteResponse> {
  const response = await fetch('https://dummyjson.com/quotes/random');
  if (!response.ok) throw new Error('Não foi possível buscar a frase. Tente novamente.');
  const data: unknown = await response.json();
  if (typeof data !== 'object' || data === null || !('quote' in data) || typeof data.quote !== 'string' ||
      !('author' in data) || typeof data.author !== 'string' || !('id' in data) || typeof data.id !== 'number') {
    throw new Error('A API retornou uma resposta inesperada.');
  }
  return { id: data.id, quote: data.quote, author: data.author };
}
