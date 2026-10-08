# TaskFlow App

Aplicativo de gerenciamento de tarefas pessoais para o Checkpoint 2, desenvolvido com React Native, Expo e TypeScript.

## Integrantes

| Nome | RM |
| --- | --- |
| Gabriel Machado Belardino | 550121 |
| Matheus Aparecido Rocha Plati | 559813 |
| Gustavo Pandolfo Meroni | 560271 |
| Gustavo Neri Santos | 560239 |
| Guilherme Augusto Caseiro | 559765 |

## Funcionalidades implementadas

- Login didático com dois perfis, mensagem para credenciais inválidas, sessão persistida e logout.
- Abas Home, Tarefas e Configurações, com pilha para lista, cadastro, detalhes e edição.
- CRUD de tarefas por usuário, com validação, confirmação de exclusão e persistência local.
- Filtros para todas, pendentes e concluídas; listagem com `FlatList` e estado vazio.
- Tema claro/escuro e preferência de tratamento persistidos.
- Frase da API pública com carregamento, erro e nova tentativa.

## Tecnologias

React Native, Expo SDK 57, TypeScript, React Navigation, Context API, AsyncStorage e Fetch.

## Estrutura principal

- `src/types`: modelos de usuário, tarefa e rotas.
- `src/context`: estado global de sessão, tarefas e tema.
- `src/hooks`: acesso tipado aos contextos.
- `src/services`: persistência local e consumo de API.
- `src/utils`: opções, validação, datas e IDs.
- `src/routes`: fluxo de autenticação, abas e pilha de tarefas.
- `src/screens`: login, Home, Tarefas e Configurações.
- `src/components`: botões, campos, cabeçalho e cartões reutilizáveis.

## Instalação e execução

Requisitos: Node.js 22 LTS, npm e Expo Go ou emulador.

```bash
npm install
npx expo start
```

## Credenciais de teste

| Perfil | Usuário | Senha |
| --- | --- | --- |
| Administrador | `admin` | `123` |
| Usuário comum | `user` | `123` |

Essas credenciais são didáticas e ficam no código.

## API

O serviço `src/services/api.ts` consome [DummyJSON Quotes](https://dummyjson.com/docs/quotes), endpoint `/quotes/random`.

Na Home, a frase é carregada com indicador visual. Em caso de erro, há uma mensagem e um botão para tentar novamente.

## Validação

1. Entre com `admin / 123`: a aba Configurações deve abrir primeiro.
2. Saia e entre com `user / 123`: a aba Home deve abrir primeiro.
3. Feche e reabra o app: a sessão deve ser restaurada sem mostrar o login.
4. Abra Tarefas e tente cadastrar com título ou descrição inválidos; confira as mensagens junto aos campos.
5. Cadastre uma tarefa válida, abra seus detalhes, edite os dados e altere o status.
6. Filtre por pendentes e concluídas. Teste o estado vazio quando não houver resultados.
7. Exclua uma tarefa: o aplicativo deve pedir confirmação. Cancele uma vez e depois confirme.
8. Feche e reabra o app para conferir a persistência; depois troque de usuário e confirme que as tarefas ficam separadas.
9. Alterne o tema e escolha Sr., Sra. ou Srta.; feche e reabra o app para verificar a persistência.
10. Na Home, confira a frase da API e toque em **Outra frase**.

## Vídeo

O link do vídeo demonstrativo será adicionado antes da entrega final (duração exigida: 3 a 7 minutos).
