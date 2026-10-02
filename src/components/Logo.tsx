import { StyleSheet, Text, View } from "react-native"

import { LogoBasketIcon } from "./icons"
import { colors, typography } from "../theme/tokens"

export function Logo() {
  return (
    <View style={styles.container}>
      <LogoBasketIcon />
      <Text style={styles.wordmark}>comprar</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  wordmark: {
    ...typography.logo,
    color: colors.accent.brand,
  },
})
