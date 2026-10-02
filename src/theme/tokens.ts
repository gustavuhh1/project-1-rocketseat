/**
 * Design tokens extraídos das variáveis do Figma
 * "Comprar app (Community)" — seção 💻 Projeto (node 3:809).
 */

export const colors = {
  background: {
    /** background/primary */
    primary: "#D0D2D8",
    /** background/elevated */
    elevated: "#FFFFFF",
  },
  border: {
    /** border/primary */
    primary: "#E4E6EC",
    /** border/secondary */
    secondary: "#C3C5CB",
  },
  text: {
    /** text/content */
    content: "#1E1E1E",
    /** text/muted */
    muted: "#828282",
    /** grayscale/gray-400 — placeholder do input */
    placeholder: "#74798B",
    /** grayscale/white */
    onBrand: "#FFFFFF",
  },
  accent: {
    /** accent/brand */
    brand: "#2C46B1",
  },
} as const

export const fontFamily = {
  /** Open Sans Regular — token "Body Md Regular" */
  regular: "OpenSans_400Regular",
  /** Open Sans SemiBold — tokens "Text Md" e "text/small" */
  semiBold: "OpenSans_600SemiBold",
  /** Quicksand Bold — wordmark da logo */
  logo: "Quicksand_700Bold",
} as const

export const typography = {
  /** Body Md Regular: Open Sans 14/18 */
  bodyMd: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 18,
  },
  /** Text Md: Open Sans SemiBold 14/18 */
  textMd: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
  },
  /** text/small: Open Sans SemiBold 12/18 */
  textSm: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 18,
  },
  /** Wordmark: Quicksand Bold 24, line-height 1.4 */
  logo: {
    fontFamily: fontFamily.logo,
    fontSize: 24,
    lineHeight: 24 * 1.4,
  },
} as const

export const radius = {
  control: 8,
  sheet: 24,
} as const

export const spacing = {
  screenGutter: 24,
  controlGap: 7,
  listGap: 16,
  filtersGap: 12,
  itemGap: 7,
} as const

export const sizes = {
  control: 48,
  icon: 18,
  iconSm: 16,
  logoMark: 32,
} as const
