import { Pressable, StyleSheet, Text, View } from "react-native"

import { CheckCircleIcon, CircleDashedIcon, TrashIcon } from "./icons"
import type { ShoppingItem } from "../models/shopping-item"
import { colors, spacing, typography } from "../theme/tokens"

type ItemRowProps = {
  item: ShoppingItem
  onToggleStatus: () => void
  onRemove: () => void
}

export function ItemRow({ item, onToggleStatus, onRemove }: ItemRowProps) {
  const isDone = item.status === "done"

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onToggleStatus}
        hitSlop={8}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isDone }}
        accessibilityLabel={item.description}
      >
        {isDone ? <CheckCircleIcon /> : <CircleDashedIcon />}
      </Pressable>

      <Text style={styles.description} numberOfLines={1}>
        {item.description}
      </Text>

      <Pressable
        onPress={onRemove}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Remover ${item.description}`}
      >
        <TrashIcon />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.itemGap,
    paddingBottom: spacing.listGap,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.primary,
  },
  description: {
    flex: 1,
    ...typography.textMd,
    color: colors.text.content,
  },
})
