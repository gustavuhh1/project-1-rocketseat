import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans"
import { Quicksand_700Bold } from "@expo-google-fonts/quicksand"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { colors } from "../theme/tokens"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    Quicksand_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background.primary },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="easter-egg"
          options={{ animation: "fade_from_bottom" }}
        />
      </Stack>
    </SafeAreaProvider>
  )
}
