import { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

const PARTICLES = ["🛒", "🥚", "✨", "🍅", "🚀", "🤖", "💜", "🧠"]

/** Explosão de emojis a cada carinho. `burstId` muda => novo disparo. */
export function EmojiBurst({ burstId }: { burstId: number }) {
  return (
    <View pointerEvents="none" style={styles.layer}>
      {PARTICLES.map((emoji, index) => (
        <Particle key={index} emoji={emoji} index={index} burstId={burstId} />
      ))}
    </View>
  )
}

function Particle({
  emoji,
  index,
  burstId,
}: {
  emoji: string
  index: number
  burstId: number
}) {
  const progress = useSharedValue(0)
  const offsetX = useSharedValue(0)
  const tilt = useSharedValue(0)

  useEffect(() => {
    if (burstId === 0) {
      return
    }

    const spread = (index - (PARTICLES.length - 1) / 2) * 26

    offsetX.value = spread + (Math.random() * 28 - 14)
    tilt.value = Math.random() * 2 - 1
    progress.value = 0
    progress.value = withTiming(1, {
      duration: 1050,
      easing: Easing.out(Easing.quad),
    })
  }, [burstId, index, offsetX, progress, tilt])

  const style = useAnimatedStyle(() => ({
    opacity: progress.value === 0 ? 0 : 1 - progress.value,
    transform: [
      { translateX: offsetX.value * progress.value },
      { translateY: -176 * progress.value },
      { scale: 0.6 + progress.value * 0.7 },
      { rotate: `${tilt.value * 150 * progress.value}deg` },
    ],
  }))

  return <Animated.Text style={[styles.emoji, style]}>{emoji}</Animated.Text>
}

const styles = StyleSheet.create({
  layer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    position: "absolute",
    fontSize: 24,
  },
})
