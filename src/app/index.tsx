import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router"
import { useMemo, useRef, useState } from "react"
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type TextInput,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Button } from "../components/Button"
import { FilterTab } from "../components/FilterTab"
import { Input } from "../components/Input"
import { ItemRow } from "../components/ItemRow"
import { Logo } from "../components/Logo"
import type { ItemStatus, ShoppingItem } from "../models/shopping-item"
import { colors, radius, spacing, typography } from "../theme/tokens"

let nextId = 0

export default function Home() {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [description, setDescription] = useState("")
  const [filter, setFilter] = useState<ItemStatus>("pending")

  const inputRef = useRef<TextInput>(null)
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const visibleItems = useMemo(
    () => items.filter((item) => item.status === filter),
    [items, filter]
  )

  function handleAdd() {
    const trimmed = description.trim()

    if (!trimmed) {
      return inputRef.current?.focus()
    }

    setItems((current) => [
      { id: String(nextId++), description: trimmed, status: "pending" },
      ...current,
    ])
    setDescription("")
    setFilter("pending")
    inputRef.current?.blur()
  }

  function handleToggleStatus(id: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "pending" ? "done" : "pending" }
          : item
      )
    )
  }

  function handleRemove(item: ShoppingItem) {
    Alert.alert("Remover item", `Remover "${item.description}" da lista?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () =>
          setItems((current) =>
            current.filter((candidate) => candidate.id !== item.id)
          ),
      },
    ])
  }

  function handleClear() {
    if (visibleItems.length === 0) {
      return
    }

    const label = filter === "pending" ? "pendentes" : "comprados"

    Alert.alert("Limpar lista", `Remover todos os itens ${label}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Limpar",
        style: "destructive",
        onPress: () =>
          setItems((current) => current.filter((item) => item.status !== filter)),
      },
    ])
  }

  /** 🥚 Easter egg: segure a logo por um instante. */
  function handleSecret() {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    router.push("/easter-egg")
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable
          onLongPress={handleSecret}
          delayLongPress={600}
          accessibilityRole="header"
          accessibilityLabel="comprar"
          accessibilityHint="Segure para abrir uma surpresa"
        >
          <Logo />
        </Pressable>

        <Input
          ref={inputRef}
          value={description}
          onChangeText={setDescription}
          placeholder="O que você precisa comprar?"
          returnKeyType="done"
          onSubmitEditing={handleAdd}
          style={styles.input}
        />

        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.sheet}>
        <View style={styles.filters}>
          <FilterTab
            status="pending"
            isActive={filter === "pending"}
            onPress={() => setFilter("pending")}
          />
          <FilterTab
            status="done"
            isActive={filter === "done"}
            onPress={() => setFilter("done")}
          />
          <Text style={styles.clear} onPress={handleClear}>
            Limpar
          </Text>
        </View>

        <FlatList
          data={visibleItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ItemRow
              item={item}
              onToggleStatus={() => handleToggleStatus(item.id)}
              onRemove={() => handleRemove(item)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui</Text>
          )}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: spacing.screenGutter,
    paddingBottom: spacing.screenGutter,
  },
  input: {
    marginTop: 42,
    marginBottom: spacing.controlGap,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.background.elevated,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    paddingTop: 32,
    paddingHorizontal: spacing.screenGutter,
  },
  filters: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.filtersGap,
    paddingBottom: spacing.listGap,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  clear: {
    flex: 1,
    ...typography.textSm,
    color: colors.text.muted,
    textAlign: "right",
  },
  listContent: {
    paddingTop: spacing.listGap,
    paddingBottom: 32,
  },
  separator: {
    height: spacing.listGap,
  },
  empty: {
    ...typography.bodyMd,
    lineHeight: 14 * 1.4,
    color: colors.text.muted,
    textAlign: "center",
  },
})
