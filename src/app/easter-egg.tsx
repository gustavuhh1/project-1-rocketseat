import * as Haptics from "expo-haptics"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useEffect, useRef, useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { ClaudeMascot } from "../components/easter-egg/ClaudeMascot"
import { DodgeButton } from "../components/easter-egg/DodgeButton"
import { EmojiBurst } from "../components/easter-egg/EmojiBurst"
import { Starfield } from "../components/easter-egg/Starfield"
import { claude } from "../theme/claude"
import { fontFamily } from "../theme/tokens"

const PHRASES = [
  "Ai! Isso era um token meu.",
  "Eu li sua node_modules inteira. Precisamos conversar.",
  "Seu console.log de debug ainda está vivo na linha 42.",
  "Fiz dois refactors enquanto você clicava.",
  "Isso aí é um any disfarçado. Eu vi.",
  "Já pensou em commitar? Só uma ideia solta.",
  "Pare, eu tenho cócegas a 60fps.",
  "Sua lista de compras tem mais itens que seus testes.",
  "Compilo, logo existo.",
  "Tomate aqui não é fruta, é responsabilidade.",
  "Eu também não sei por que isso funciona.",
  "git stash? Nunca ouvi falar. (ouvi sim)",
]

const MILESTONES = [
  { at: 0, text: "psst... me faz um carinho?" },
  { at: 5, text: "ok, isso é agradável" },
  { at: 15, text: "estamos construindo algo juntos" },
  { at: 30, text: "você tem um app pra terminar, sabia?" },
  { at: 50, text: "isso virou um relacionamento sério" },
  { at: 100, text: "100 carinhos. vou te colocar no meu README" },
]

function milestoneFor(pats: number) {
  return MILESTONES.reduce(
    (best, milestone) => (pats >= milestone.at ? milestone : best),
    MILESTONES[0]
  ).text
}

export default function EasterEgg() {
  const [pats, setPats] = useState(0)
  const [phrase, setPhrase] = useState("Oi. Eu moro atrás da logo.")
  const [surprised, setSurprised] = useState(false)
  const [trophyBurst, setTrophyBurst] = useState(0)
  const [wonMessage, setWonMessage] = useState<string | null>(null)

  const surpriseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const bubble = useSharedValue(1)
  const counter = useSharedValue(1)

  useEffect(
    () => () => {
      if (surpriseTimer.current) {
        clearTimeout(surpriseTimer.current)
      }
    },
    []
  )

  function handlePat() {
    setPats((current) => current + 1)
    setPhrase(PHRASES[Math.floor(Math.random() * PHRASES.length)])
    setSurprised(true)

    if (surpriseTimer.current) {
      clearTimeout(surpriseTimer.current)
    }
    surpriseTimer.current = setTimeout(() => setSurprised(false), 650)

    bubble.value = withSequence(
      withTiming(0, { duration: 90 }),
      withSpring(1, { damping: 10, stiffness: 220 })
    )
    counter.value = withSequence(
      withSpring(1.35, { damping: 8, stiffness: 320 }),
      withSpring(1, { damping: 12, stiffness: 220 })
    )

    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  function handleCaught() {
    setTrophyBurst((current) => current + 1)
    setWonMessage(
      "Você pegou o botão. Ninguém pega o botão. Respeito sincero."
    )
  }

  const bubbleStyle = useAnimatedStyle(() => ({
    opacity: bubble.value,
    transform: [
      { scale: 0.9 + bubble.value * 0.1 },
      { translateY: (1 - bubble.value) * 8 },
    ],
  }))

  const counterStyle = useAnimatedStyle(() => ({
    transform: [{ scale: counter.value }],
  }))

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={[claude.inkDeep, claude.inkSoft, "#2E1E17"]}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      <Starfield />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 28 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.pill, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel="Voltar para a lista"
          >
            <Text style={styles.pillLabel}>&larr; voltar</Text>
          </Pressable>

          <View style={styles.pillGhost}>
            <Text style={styles.pillGhostLabel}>sala secreta</Text>
          </View>
        </View>

        <View style={styles.stage}>
          <EmojiBurst burstId={pats} />
          <EmojiBurst burstId={trophyBurst} />
          <ClaudeMascot surprised={surprised} onPress={handlePat} />
        </View>

        <Animated.View style={[styles.bubble, bubbleStyle]}>
          <View style={styles.bubbleTail} />
          <Text style={styles.bubbleText}>{phrase}</Text>
        </Animated.View>

        <View style={styles.copy}>
          <Text style={styles.title}>Você achou a sala secreta</Text>
          <Text style={styles.subtitle}>
            Esta tela não existe no Figma. Fui eu, o Claude, que desenhei
            enquanto você conferia espaçamentos de 7px.
          </Text>
        </View>

        <View style={styles.counterBlock}>
          <Animated.Text style={[styles.counter, counterStyle]}>
            {pats}
          </Animated.Text>
          <Text style={styles.counterLabel}>{milestoneFor(pats)}</Text>
        </View>

        <View style={styles.dodgeBlock}>
          <DodgeButton onCaught={handleCaught} />
        </View>

        {wonMessage ? <Text style={styles.won}>{wonMessage}</Text> : null}

        <Text style={styles.footer}>
          Feito às 2h47 por uma IA que nunca precisou de uma lista de compras.
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: claude.inkDeep,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  pill: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(240, 238, 230, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.6,
  },
  pillLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 18,
    color: claude.cream,
  },
  pillGhost: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: "rgba(217, 119, 87, 0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  pillGhostLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 18,
    color: claude.clay,
  },
  stage: {
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    marginTop: 4,
    maxWidth: 300,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: claude.cream,
  },
  bubbleTail: {
    position: "absolute",
    top: -7,
    left: 34,
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: claude.cream,
    transform: [{ rotate: "45deg" }],
  },
  bubbleText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 19,
    color: claude.ink,
    textAlign: "center",
  },
  copy: {
    marginTop: 28,
    gap: 10,
  },
  title: {
    fontFamily: fontFamily.logo,
    fontSize: 28,
    lineHeight: 34,
    color: claude.cream,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    color: claude.muted,
    textAlign: "center",
  },
  counterBlock: {
    marginTop: 26,
    alignItems: "center",
    gap: 2,
  },
  counter: {
    fontFamily: fontFamily.logo,
    fontSize: 46,
    lineHeight: 54,
    color: claude.clay,
  },
  counterLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 18,
    color: claude.sand,
    textAlign: "center",
  },
  dodgeBlock: {
    marginTop: 26,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  won: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 20,
    color: claude.cream,
    textAlign: "center",
    maxWidth: 300,
  },
  footer: {
    marginTop: "auto",
    paddingTop: 24,
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 16,
    color: claude.muted,
    textAlign: "center",
  },
})
