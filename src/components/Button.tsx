import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
} from "react-native"

import { colors, radius, sizes, typography } from "../theme/tokens"

type ButtonProps = PressableProps & {
  title: string
}

export function Button({ title, style, ...rest }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        typeof style === "function" ? undefined : style,
      ]}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: sizes.control,
    paddingHorizontal: 20,
    backgroundColor: colors.accent.brand,
    borderRadius: radius.control,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.85,
  },
  title: {
    ...typography.textMd,
    color: colors.text.onBrand,
    textAlign: "center",
  },
})
