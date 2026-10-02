import { useEffect, useMemo } from "react"
import { StyleSheet } from "react-native"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

import { claude } from "../../theme/claude"

type Speck = {
  left: number
  top: number
  size: number
  duration: number
  delay: number
  drift: number
}

/**
 * PRNG determinístico: espalha a poeira de forma aparentemente aleatória,
 * mas estável entre renders (e puro, do ponto de vista do React).
 */
function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function buildSpeck(index: number): Speck {
  const random = (salt: number) => pseudoRandom(index * 7 + salt)

  return {
    left: random(1) * 100,
    top: random(2) * 100,
    size: 2 + random(3) * 4,
    duration: 3200 + random(4) * 4200,
    delay: random(5) * 2600,
    drift: -18 - random(6) * 26,
  }
}

/** Poeira cósmica de fundo: pontinhos que sobem, crescem e piscam. */
export function Starfield({ count = 22 }: { count?: number }) {
  const specks = useMemo(
    () => Array.from({ length: count }, (_, index) => buildSpeck(index)),
    [count]
  )

  return (
    <>
      {specks.map((speck, index) => (
        <Speckle key={index} speck={speck} />
      ))}
    </>
  )
}

function Speckle({ speck }: { speck: Speck }) {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withDelay(
      speck.delay,
      withRepeat(
        withTiming(1, {
          duration: speck.duration,
          easing: Easing.inOut(Easing.quad),
        }),
        -1,
        true
      )
    )
  }, [progress, speck.delay, speck.duration])

  const style = useAnimatedStyle(() => ({
    opacity: 0.12 + progress.value * 0.55,
    transform: [
      { translateY: progress.value * speck.drift },
      { scale: 0.7 + progress.value * 0.6 },
    ],
  }))

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.speck,
        {
          left: `${speck.left}%`,
          top: `${speck.top}%`,
          width: speck.size,
          height: speck.size,
          borderRadius: speck.size / 2,
        },
        style,
      ]}
    />
  )
}

const styles = StyleSheet.create({
  speck: {
    position: "absolute",
    backgroundColor: claude.sand,
  },
})
