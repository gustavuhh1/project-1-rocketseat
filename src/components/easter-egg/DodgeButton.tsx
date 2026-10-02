import * as Haptics from "expo-haptics"
import { useState } from "react"
import { Pressable, StyleSheet, Text } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import { claude } from "../../theme/claude"

const DODGES_UNTIL_SURRENDER = 6

/** O clássico botão covarde: ele foge até cansar. */
export function DodgeButton({ onCaught }: { onCaught: () => void }) {
  const [dodges, setDodges] = useState(0)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const hasSurrendered = dodges >= DODGES_UNTIL_SURRENDER

  function handlePressIn() {
    if (hasSurrendered) {
      return
    }

    translateX.value = withSpring((Math.random() * 2 - 1) * 96, {
      damping: 11,
      stiffness: 160,
    })
    translateY.value = withSpring((Math.random() * 2 - 1) * 34, {
      damping: 11,
      stiffness: 160,
    })

    setDodges((current) => current + 1)
    void Haptics.selectionAsync()
  }

  function handlePress() {
    if (!hasSurrendered) {
      return
    }

    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    onCaught()
  }

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }))

  return (
    <Animated.View style={style}>
      <Pressable
        onPressIn={handlePressIn}
        onPress={handlePress}
        style={({ pressed }) => [
          styles.button,
          hasSurrendered && styles.surrendered,
          pressed && hasSurrendered && styles.pressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={
          hasSurrendered ? "Ok, você ganhou" : "Não clique aqui"
        }
      >
        <Text style={[styles.label, hasSurrendered && styles.labelSurrendered]}>
          {hasSurrendered ? "Tá bom, você ganhou 🏆" : "Não clique aqui"}
        </Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: claude.clay,
    alignItems: "center",
    justifyContent: "center",
  },
  surrendered: {
    backgroundColor: claude.clay,
    borderColor: claude.clay,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 14,
    lineHeight: 18,
    color: claude.clay,
  },
  labelSurrendered: {
    color: claude.ink,
  },
})
