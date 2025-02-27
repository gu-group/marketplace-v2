import {
  crimson,
  slate,
  crimsonDark,
  violetDark,
  slateDark,
  greenDark,
  green,
  violetDarkA,
  whiteA,
  redDark,
  red,
  blackA,
  violet,
  violetA,
  indigo,
  indigoA,
  gray,
  indigoDark,
  indigoDarkA,
} from '@radix-ui/colors'
import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'
import { reset } from 'utils/css/reset'
import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
})

export type CSS = Stitches.CSS<typeof config>
export type CSSProps = { css?: CSS }

// CONFIGURABLE: Here you can update all your theming
// The theme colors are all already hooked up to stitches scales, so you just need to swap them.
// Don't forget to check the dark mode themes below.
// More on Stitches theme tokens: https://stitches.dev/docs/tokens
// More on Radix color scales: https://www.radix-ui.com/docs/colors/palette-composition/the-scales

export const { createTheme, keyframes, styled, globalCss, getCssText, config } =
  createStitches({
    theme: {
      colors: {
        ...crimson,
        ...violet,
        ...violetA,
        ...slate,
        ...red,
        ...whiteA,
        ...blackA,
        ...green,

        //Aliases

        //Primary
        primary1: '$violet1',
        primary2: '$violet2',
        primary3: '$violet3',
        primary4: '$violet4',
        primary5: '$violet5',
        primary6: '$violet6',
        primary7: '$violet7',
        primary8: '$violet8',
        primary9: '$violet9',
        primary10: '$violet10',
        primary11: '$violet11',
        primary12: '$violet12',

        //Secondary
        secondary1: '$violetA1',
        secondary2: '$violetA2',
        secondary3: '$violetA3',
        secondary4: '$violetA4',
        secondary5: '$violetA5',
        secondary6: '$violetA6',
        secondary7: '$violetA7',
        secondary8: '$violetA8',
        secondary9: '$violetA9',
        secondary10: '$violetA10',
        secondary11: '$violetA11',
        secondary12: '$violetA12',

        //Gray
        gray1: '$slate1',
        gray2: '$slate2',
        gray3: '$slate3',
        gray4: '$slate4',
        gray5: '$slate5',
        gray6: '$slate6',
        gray7: '$slate7',
        gray8: '$slate8',
        gray9: '$slate9',
        gray10: '$slate10',
        gray11: '$slate11',
        gray12: '$slate12',

        //Red
        red1: '$crimson1',
        red2: '$crimson2',
        red3: '$crimson3',
        red4: '$crimson4',
        red5: '$crimson5',
        red6: '$crimson6',
        red7: '$crimson7',
        red8: '$crimson8',
        red9: '$crimson9',
        red10: '$crimson10',
        red11: '$crimson11',
        red12: '$crimson12',

        neutralBg: 'white',
        neutralBgSubtle: 'white',
        panelShadow: 'rgba(0,0,0,0.1)',
        panelBg: '$gray2',
        panelBorder: 'transparent',
        dropdownBg: 'white',
      },
      space: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '32px',
        6: '64px',
      },
      fontSizes: {},
      fontWeights: {},
      fonts: {
        body: inter.style.fontFamily,
        button: '$body',
      },
      lineHeights: {},
      letterSpacings: {},
      sizes: {},
      radii: {},
      shadows: {},
      transitions: {},
      breakpoints: {
        sm: 100,
      },
    },
    utils: {
      // MARGIN
      m: (value: Stitches.PropertyValue<'margin'>) => ({
        margin: value,
      }),
      mx: (value: Stitches.PropertyValue<'margin'>) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: Stitches.PropertyValue<'margin'>) => ({
        marginTop: value,
        marginBottom: value,
      }),
      mt: (value: Stitches.PropertyValue<'margin'>) => ({
        marginTop: value,
      }),
      mb: (value: Stitches.PropertyValue<'margin'>) => ({
        marginBottom: value,
      }),
      ml: (value: Stitches.PropertyValue<'margin'>) => ({
        marginLeft: value,
      }),
      mr: (value: Stitches.PropertyValue<'margin'>) => ({
        marginRight: value,
      }),

      // PADDING
      p: (value: Stitches.PropertyValue<'padding'>) => ({
        padding: value,
      }),
      px: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
      pt: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingTop: value,
      }),
      pb: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingBottom: value,
      }),
      pl: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingLeft: value,
      }),
      pr: (value: Stitches.PropertyValue<'padding'>) => ({
        paddingRight: value,
      }),
      // DIMENSIONS
      w: (value: Stitches.PropertyValue<'width'>) => ({
        width: value,
      }),
      h: (value: Stitches.PropertyValue<'height'>) => ({
        height: value,
      }),
      size: (value: Stitches.PropertyValue<'width'>) => ({
        width: value,
        height: value,
      }),
      // GRID
      colSpan: (value: number | 'full') => {
        if (value === 'full') {
          return {
            gridColumn: '1 / -1',
          }
        }
        return {
          gridColumn: `span ${value} / span ${value}`,
        }
      },
    },
    media: {
      sm: '(min-width: 600px)',
      md: '(min-width: 900px)',
      lg: '(min-width: 1200px)',
      xl: '(min-width: 1400px)',
      bp300: '(min-width: 300px)',
      bp400: '(min-width: 400px)',
      bp500: '(min-width: 500px)',
      bp600: '(min-width: 600px)',
      bp700: '(min-width: 700px)',
      bp800: '(min-width: 800px)',
      bp900: '(min-width: 900px)',
      bp1000: '(min-width: 1000px)',
      bp1100: '(min-width: 1100px)',
      bp1200: '(min-width: 1200px)',
      bp1300: '(min-width: 1300px)',
      bp1400: '(min-width: 1400px)',
      motion: '(prefers-reduced-motion)',
      hover: '(any-hover: hover)',
      dark: '(prefers-color-scheme: dark)',
      light: '(prefers-color-scheme: light)',
    },
  })

export const globalReset = globalCss(reset)

export const darkTheme = createTheme({
  colors: {
    ...redDark,
    ...indigoDark,
    ...indigoDarkA,
    ...slateDark,
    ...blackA,
    ...green,
    ...crimsonDark,
    ...violetDark,
    ...violetDarkA,
    ...slateDark,
    ...greenDark,
    ...whiteA,
    ...redDark,
    ...blackA,

    // accent colors
    accentBase: '$indigo1',
    accentBgSubtle: '$indigo2',
    accentBg: '$indigo3',
    accentBgHover: '$indigo4',
    accentBgActive: '$indigo5',
    accentLine: '$indigo6',
    accentBorder: '$indigo7',
    accentBorderHover: '$indigo8',
    accentSolid: '$indigo9',
    accentSolidHover: '$indigo10',
    accentText: '$indigo11',
    accentTextContrast: '$indigo12',

    // neutral colors
    neutralBase: '$slate1',
    neutralBgSubtle: '$gray3',
    neutralBg: '$gray1',
    neutralBgHover: '$slate4',
    neutralBgActive: '$slate5',
    neutalLine: '$slate6',
    neutralBorder: '$slate7',
    neutralBorderHover: '$slate8',
    neutralSolid: '$slate9',
    neutralSolidHover: '$slate10',
    neutralText: '$slate11',
    neutralTextContrast: '$slate12',

    // secondary colors
    secondaryBase: '$indigoA1',
    secondaryBgSubtle: '$indigoA2',
    secondaryBg: '$indigoA3',
    secondaryBgHover: '$indigoA4',
    secondaryBgActive: '$indigoA5',
    secondaryLine: '$indigoA6',
    secondaryBorder: '$indigoA7',
    secondaryBorderHover: '$indigoA8',
    secondarySolid: '$indigoA9',
    secondarySolidHover: '$indigoA10',
    secondaryText: '$indigoA11',
    secondaryTextContrast: '$indigoA12',

    // general colors
    borderColor: '$neutralBorder',
    textColor: '$neutralTextContrast',
    focusColor: '$neutralTextContrast',
    errorText: '$red12',
    errorAccent: '$red10',
    successAccent: '$green10',


    // component colors
    logoColor: '#ECEDEE',
    inputBackground: '$neutralBgHover',
    buttonTextColor: 'white',
    buttonTextHoverColor: 'white',
    overlayBackground: '$blackA10',
    headerBackground: '$neutralBgHover',
    footerBackground: '$neutralBg',
    contentBackground: '$neutralBgSubtle',
    wellBackground: '$neutralBase',
    popoverBackground: '$neutralBgActive',

    //Primary
    primary1: '$violet1',
    primary2: '$violet2',
    primary3: '$violet3',
    primary4: '$violet4',
    primary5: '$violet5',
    primary6: '$violet6',
    primary7: '$violet7',
    primary8: '$violet8',
    primary9: '$violet9',
    primary10: '$violet10',
    primary11: '$violet11',
    primary12: '$violet12',

    //Secondary
    secondary1: '$violetA1',
    secondary2: '$violetA2',
    secondary3: '$violetA3',
    secondary4: '$violetA4',
    secondary5: '$violetA5',
    secondary6: '$violetA6',
    secondary7: '$violetA7',
    secondary8: '$violetA8',
    secondary9: '$violetA9',
    secondary10: '$violetA10',
    secondary11: '$violetA11',
    secondary12: '$violetA12',

    //Gray
    gray1: '$slate1',
    gray2: '$slate2',
    gray3: '$slate3',
    gray4: '$slate4',
    gray5: '$slate5',
    gray6: '$slate6',
    gray7: '$slate7',
    gray8: '$slate8',
    gray9: '$slate9',
    gray10: '$slate10',
    gray11: '$slate11',
    gray12: '$slate12',

    accent: '#7000FF',

    panelBg: '$gray3',
    panelBorder: '$slate7',
    panelShadow: 'transparent',
    dropdownBg: '$gray3',
  },
})

export const lightTheme = createTheme({
  colors: {
    ...indigo,
    ...indigoA,
    ...red,
    ...gray,
    ...blackA,
    ...whiteA,
    ...green,

    // accent colors
    accentBase: '$indigo1',
    accentBgSubtle: '$indigo2',
    accentBg: '$indigo3',
    accentBgHover: '$indigo4',
    accentBgActive: '$indigo5',
    accentLine: '$indigo6',
    accentBorder: '$indigo7',
    accentBorderHover: '$indigo8',
    accentSolid: '$indigo9',
    accentSolidHover: '$indigo10',
    accentText: '$indigo11',
    accentTextContrast: '$indigo12',

    // neutral colors
    neutralBase: '$gray1',
    neutralBgSubtle: 'white',
    neutralBg: '$gray3',
    neutralBgHover: '$gray2',
    neutralBgActive: '$gray5',
    neutalLine: '$gray6',
    neutralBorder: '$gray7',
    neutralBorderHover: '$gray8',
    neutralSolid: '$gray9',
    neutralSolidHover: '$gray10',
    neutralText: '$gray11',
    neutralTextContrast: '$gray12',

    // secondary colors
    secondaryBase: '$indigoA1',
    secondaryBgSubtle: '$indigoA2',
    secondaryBg: '$indigoA3',
    secondaryBgHover: '$indigoA4',
    secondaryBgActive: '$indigoA5',
    secondaryLine: '$indigoA6',
    secondaryBorder: '$indigoA7',
    secondaryBorderHover: '$indigoA8',
    secondarySolid: '$indigoA9',
    secondarySolidHover: '$indigoA10',
    secondaryText: '$indigoA11',
    secondaryTextContrast: '$indigoA12',

    // general colors
    borderColor: '$neutralBorder',
    textColor: '$neutralTextContrast',
    focusColor: '$neutralTextContrast',
    errorText: '$red12',
    errorAccent: '$red10',
    successAccent: '$green10',

    // component colors
    logoColor: '#11181C',
    buttonTextColor: 'white',
    buttonTextHoverColor: 'white',
    inputBackground: '$neutralBgHover',
    overlayBackground: '$blackA10',
    headerBackground: '$neutralBgHover',
    footerBackground: '$neutralBgHover',
    contentBackground:  '$neutralBgSubtle',
    wellBackground: '$gray3',
    popoverBackground: '$neutralBase',
  },
})
