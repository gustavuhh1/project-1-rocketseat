import { forwardRef } from "react"
import { StyleSheet, TextInput, type TextInputProps } from "react-native"

import { colors, radius, sizes, typography } from "../theme/tokens"

export const Input = forwardRef<TextInput, TextInputProps>(function Input(
  props,
  ref
) {
  return (
    <TextInput
      ref={ref}
      style={styles.input}
      placeholderTextColor={colors.text.placeholder}
      {...props}
    />
  )
})

const styles = StyleSheet.create({
  input: {
    height: sizes.control,
    paddingHorizontal: 16,
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.secondary,
    borderRadius: radius.control,
    ...typography.bodyMd,
    color: colors.text.content,
  },
})
