import { Image } from "expo-image"

import checkCircleAsset from "../assets/icons/check-circle.svg"
import circleDashedAsset from "../assets/icons/circle-dashed.svg"
import logoBasketAsset from "../assets/icons/logo-basket.svg"
import trashAsset from "../assets/icons/trash.svg"
import { sizes } from "../theme/tokens"

/**
 * SVGs exportados direto do Figma. Cada um é renderizado nas dimensões
 * nativas do seu root (<svg width/height>), sem reescalar.
 */

/** Sacola da logo — 32x32 */
export function LogoBasketIcon() {
  return (
    <Image
      source={logoBasketAsset}
      style={{ width: sizes.logoMark, height: sizes.logoMark }}
      contentFit="contain"
    />
  )
}

/** Círculo tracejado (item pendente / filtro "Pendentes") — 18x18 */
export function CircleDashedIcon() {
  return (
    <Image
      source={circleDashedAsset}
      style={{ width: sizes.icon, height: sizes.icon }}
      contentFit="contain"
    />
  )
}

/** Círculo com check (item comprado / filtro "Comprados") — 18x18 */
export function CheckCircleIcon() {
  return (
    <Image
      source={checkCircleAsset}
      style={{ width: sizes.icon, height: sizes.icon }}
      contentFit="contain"
    />
  )
}

/** Lixeira — 16x16 */
export function TrashIcon() {
  return (
    <Image
      source={trashAsset}
      style={{ width: sizes.iconSm, height: sizes.iconSm }}
      contentFit="contain"
    />
  )
}
