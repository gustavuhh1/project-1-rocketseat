# 🛒 Comprar app

Aplicativo mobile de **lista de compras** feito em React Native + TypeScript, com adicionar, remover, marcar como comprado e filtrar itens entre pendentes e comprados.

Projeto de estudo da trilha **[React Native 2025 da Rocketseat](https://app.rocketseat.com.br/jornada/react-native-2025/conteudos)** — Nível 1: *Fundamentos do React Native*, o módulo que ensina componentização, estado e estilização construindo exatamente este app.

> 📚 Aula de referência: [Utilizando propriedades no componente](https://app.rocketseat.com.br/jornada/react-native-2025/sala/introducao-ao-react-native/grupo/componentes-2/aula/utilizando-propriedades-no-componente-2025) — módulo *Introdução ao React Native*, grupo *Componentes*.

---

## 📱 As três telas

| Lista vazia | Pendentes | Comprados |
| --- | --- | --- |
| Estado inicial com "Nenhum item aqui" | Itens a comprar, com checkbox tracejado | Itens já comprados, com check azul |

Layout implementado a partir do [Figma oficial do desafio](https://www.figma.com/design/p7P6B2aqdFCNLkgKDL3V45/Comprar-app--Community-) (arquivo da comunidade Rocketseat), respeitando os tokens de design do arquivo.

---

## 🎓 O que eu aprendi

### Componentização e propriedades
O coração do módulo. Em vez de uma tela monolítica, a interface virou componentes pequenos e reutilizáveis — cada um com uma responsabilidade só:

- **`Button`** — recebe `title` por props e **estende as props nativas** do `Pressable` via `PressableProps & { title: string }`, usando desestruturação com **rest operator** (`{ title, style, ...rest }`) para repassar tudo o que não é tratado localmente. É o padrão ensinado na aula de propriedades: o componente é flexível sem precisar declarar prop por prop.
- **`Input`** — mesma ideia com `TextInputProps`, mais `forwardRef` para a tela conseguir dar `focus()` e `blur()` no campo.
- **`FilterTab`** e **`ItemRow`** — componentes que recebem dados e **callbacks** (`onPress`, `onToggleStatus`, `onRemove`), deixando a lógica na tela e a aparência no componente.

### TypeScript aplicado de verdade
- Tipos próprios do domínio: `ItemStatus = "pending" | "done"` e `ShoppingItem`, que fazem o compilador cobrar os estados válidos.
- `Record<ItemStatus, string>` para mapear status → label, garantindo que nenhum status fique sem texto.
- Tipagem de props herdando de componentes nativos em vez de redeclarar tudo na mão.

### Estado e renderização de listas
- `useState` para a lista de itens, o texto do input e o filtro ativo.
- **Atualização imutável**: `map` para alternar o status de um item e `filter` para remover — nunca mutando o array original.
- `useMemo` para derivar a lista visível a partir de `items` + `filter`, sem guardar estado duplicado.
- `FlatList` com `keyExtractor`, `ItemSeparatorComponent` e `ListEmptyComponent` (o estado vazio sai de graça aí, sem `if` na tela).

### Estilização fiel ao design
- `StyleSheet.create` com **design tokens centralizados** em `src/theme/tokens.ts` — cores, tipografia, raios e espaçamentos saíram das variáveis do Figma, não de valores soltos pelo código.
- Flexbox na prática: `flex: 1` para a folha branca ocupar o resto da tela, `gap`, `flexDirection` e `alignItems` para as linhas.
- Fontes customizadas (Open Sans e Quicksand) carregadas com `expo-font` + splash screen segurando a renderização até ficarem prontas.
- Área segura com `react-native-safe-area-context`, para o conteúdo não encostar no notch.

### Navegação com arquivos (Expo Router)
Cada arquivo em `src/app/` é uma rota: `index.tsx` é a Home e `_layout.tsx` define o `Stack`. Navegação via `useRouter()`.

### Feedback e animação
`expo-haptics` para vibração ao interagir e `react-native-reanimated` para animações rodando na thread de UI (shared values, `withSpring`, `withSequence`, `withRepeat`).

### 📌 Ainda no roadmap deste módulo
- [ ] **AsyncStorage** — hoje a lista vive em memória e some ao fechar o app. Persistir localmente é o próximo passo do Nível 1.

---

## 🥚 Easter egg

Tem uma tela secreta escondida no app. **Segure a logo "comprar" por um instante** na Home para encontrá-la — tem mascote animado, explosão de emojis e um botão que se recusa a ser clicado.

---

## 🛠 Stack

| | |
| --- | --- |
| **Runtime** | [Expo](https://expo.dev) SDK 57 · React Native 0.86 · React 19 |
| **Linguagem** | TypeScript (modo `strict`) |
| **Navegação** | [Expo Router](https://docs.expo.dev/router/introduction/) |
| **Animação** | [Reanimated](https://docs.swmansion.com/react-native-reanimated/) 4 |
| **Imagens** | [expo-image](https://docs.expo.dev/versions/latest/sdk/image/) (renderiza os SVGs do Figma) |
| **Fontes** | Open Sans · Quicksand (via `expo-font`) |

## 🚀 Rodando o projeto

```bash
npm install
npx expo start
```

Depois leia o QR Code com o app **Expo Go** ou pressione `a` / `i` para abrir no emulador Android / simulador iOS.

```bash
npx tsc --noEmit   # checagem de tipos
npx expo lint      # lint
npx expo-doctor    # diagnóstico de dependências
```

## 📂 Estrutura

```
src/
├── app/                  # rotas (Expo Router)
│   ├── _layout.tsx       # Stack + carregamento de fontes
│   ├── index.tsx         # Home — a lista de compras
│   └── easter-egg.tsx    # 🥚
├── assets/icons/         # SVGs exportados do Figma
├── components/           # componentes reutilizáveis
├── models/               # tipos do domínio
└── theme/                # design tokens
```

## 🙌 Créditos

Desafio e design por **[Rocketseat](https://www.rocketseat.com.br/)**, da trilha de React Native 2025. Repositório de estudo pessoal, sem fins comerciais.
