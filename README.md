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

## Etapa atual

Esta primeira etapa contém o projeto Expo, os tipos do domínio, os serviços de armazenamento, a integração tipada com a API de frases e os contextos de autenticação, tarefas e tema. As telas e a navegação serão implementadas nas próximas etapas.

## Tecnologias

React Native, Expo SDK 57, TypeScript, Context API, AsyncStorage e Fetch. As próximas etapas incluirão React Navigation.

## Estrutura principal

- `src/types`: modelos de usuário, tarefa e rotas.
- `src/context`: estado global de sessão, tarefas e tema.
- `src/hooks`: acesso tipado aos contextos.
- `src/services`: persistência local e consumo de API.
- `src/utils`: opções, validação, datas e IDs.

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

O serviço `src/services/api.ts` consome [DummyJSON Quotes](https://dummyjson.com/docs/quotes), endpoint `/quotes/random`. A exibição na Home será incluída na etapa das telas.

## Vídeo

O link do vídeo demonstrativo será adicionado antes da entrega final (duração exigida: 3 a 7 minutos).
