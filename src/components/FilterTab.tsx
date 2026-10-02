import { Pressable, StyleSheet, Text } from "react-native"

import { CheckCircleIcon, CircleDashedIcon } from "./icons"
import type { ItemStatus } from "../models/shopping-item"
import { colors, typography } from "../theme/tokens"

type FilterTabProps = {
  status: ItemStatus
  isActive: boolean
  onPress: () => void
}

const LABELS: Record<ItemStatus, string> = {
  pending: "Pendentes",
  done: "Comprados",
}

export function FilterTab({ status, isActive, onPress }: FilterTabProps) {
  return (
    <Pressable
      style={[styles.container, !isActive && styles.inactive]}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
    >
      {status === "pending" ? <CircleDashedIcon /> : <CheckCircleIcon />}
      <Text style={styles.label}>{LABELS[status]}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  inactive: {
    opacity: 0.5,
  },
  label: {
    ...typography.textSm,
    color: colors.text.content,
  },
})
