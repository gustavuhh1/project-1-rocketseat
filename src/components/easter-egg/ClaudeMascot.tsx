import { useEffect } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated"

import { claude } from "../../theme/claude"

const HALO_SPOKES = 6

type ClaudeMascotProps = {
  /** Muda a boca para um "ó" de susto quando acabou de receber um carinho. */
  surprised: boolean
  onPress: () => void
}

export function ClaudeMascot({ surprised, onPress }: ClaudeMascotProps) {
  const bob = useSharedValue(0)
  const spin = useSharedValue(0)
  const squish = useSharedValue(1)
  const blink = useSharedValue(1)

  useEffect(() => {
    bob.value = withRepeat(
      withTiming(1, { duration: 1700, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    )
    spin.value = withRepeat(
      withTiming(1, { duration: 14000, easing: Easing.linear }),
      -1,
      false
    )
  }, [bob, spin])

  useEffect(() => {
    const id = setInterval(
      () => {
        blink.value = withSequence(
          withTiming(0.08, { duration: 70 }),
          withTiming(1, { duration: 130 })
        )
      },
      2200 + Math.random() * 2000
    )

    return () => clearInterval(id)
  }, [blink])

  function handlePress() {
    squish.value = withSequence(
      withSpring(0.84, { damping: 12, stiffness: 320 }),
      withSpring(1.08, { damping: 9, stiffness: 240 }),
      withSpring(1, { damping: 14, stiffness: 200 })
    )
    onPress()
  }

  const bodyStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: -10 * bob.value },
      { rotate: `${-3 + bob.value * 6}deg` },
      { scale: squish.value },
    ],
  }))

  const haloStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value * 360}deg` }, { scale: squish.value }],
    opacity: 0.35 + bob.value * 0.25,
  }))

  const eyeStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: blink.value }],
  }))

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel="Fazer carinho no Claude"
      style={styles.pressArea}
    >
      <Animated.View style={[styles.halo, haloStyle]} pointerEvents="none">
        {Array.from({ length: HALO_SPOKES }, (_, index) => (
          <View
            key={index}
            style={[
              styles.spoke,
              { transform: [{ rotate: `${(180 / HALO_SPOKES) * index}deg` }] },
            ]}
          />
        ))}
      </Animated.View>

      <Animated.View style={[styles.body, bodyStyle]}>
        <View style={styles.eyes}>
          <Animated.View style={[styles.eye, eyeStyle]} />
          <Animated.View style={[styles.eye, eyeStyle]} />
        </View>

        {surprised ? (
          <View style={styles.mouthSurprised} />
        ) : (
          <View style={styles.mouthSmile} />
        )}

        <View style={[styles.blush, styles.blushLeft]} />
        <View style={[styles.blush, styles.blushRight]} />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressArea: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  halo: {
    position: "absolute",
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  spoke: {
    position: "absolute",
    width: 9,
    height: 206,
    borderRadius: 5,
    backgroundColor: claude.clay,
  },
  body: {
    width: 132,
    height: 132,
    borderRadius: 46,
    backgroundColor: claude.cream,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  eyes: {
    flexDirection: "row",
    gap: 26,
  },
  eye: {
    width: 14,
    height: 20,
    borderRadius: 7,
    backgroundColor: claude.ink,
  },
  mouthSmile: {
    width: 42,
    height: 20,
    borderBottomWidth: 4,
    borderColor: claude.ink,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  mouthSurprised: {
    width: 22,
    height: 22,
    borderWidth: 4,
    borderColor: claude.ink,
    borderRadius: 11,
  },
  blush: {
    position: "absolute",
    width: 20,
    height: 10,
    borderRadius: 10,
    backgroundColor: claude.clay,
    opacity: 0.35,
    top: 78,
  },
  blushLeft: {
    left: 16,
  },
  blushRight: {
    right: 16,
  },
})
