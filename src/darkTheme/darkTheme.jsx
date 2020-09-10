import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const PTSansFont = {
  fontFamily: 'PT Sans',
  fontDisplay: 'swap',
  src: `
    local('PT Sans'),
    local('PT Sans'),
    url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap') format('truetype')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

export const colors = {
  beta: {
    bg: 'radial-gradient(22.99% 100% at 50.42% 100%, rgba(64, 169, 255, 0.3) 0%, rgba(64, 169, 255, 0) 100%), #293140;',
    color: '#fff',
    shadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    close: '#E6F7FF',
  },
  home: {
    text: '#fff',
    bg: '#111A21',
    hover: '#fff',
  },
  button: {
    bg: 'linear-gradient(100.35deg, #369EFF 0%, #096DD9 100%)',
    color: '#fff',
    hover: '#fff',
    border: '1px solid #096DD9',
    shadow: '0px 0px 14px rgba(64, 169, 255, 0.4), inset 0px 1px 1px rgba(255, 255, 255, 0.4)',
  },
  wallet: {
    dot: '#394861',
    dotSelected: 'linear-gradient(100.35deg, #369EFF 0%, #096DD9 100%)',
    button: {
      bg: '#293140',
      shadow: '0px 1px 4px rgba(0, 0, 0, 0.15)',
      hover: '#293140',
    },
  },
  header: {
    text: '#fff',
    connect: {
      border: '1px solid #3a9dfe',
      bg: '#293140',
      shadow: '0px 0px 1px rgba(0, 0, 0, 0.25)',
      hover: 'rgba(47, 128, 237, 0.1)',
      arrow: '6px solid #818FA6',
    },
  },
  glowShadow: 'radial-gradient(52.66% 50.98% at 50% 0%, rgba(64, 169, 255, 0.15) 0%, rgba(64, 169, 255, 0) 89.58%);',
  textShadow: '0px 0px 10px #40A9FF',
  connectedShadow: '0px 0px 10px #73D13D',
  bg: '#111a21',
  white: '#654321',
  black: '#000',
  darkBlue: '#2c3b57',
  blue: '#2F80ED',
  gray: '#e1e1e1',
  lightGray: '#737373',
  lightBlack: '#6a6a6a',
  darkBlack: '#141414',
  green: '#1abc9c',
  red: '#ed4337',
  orange: 'orange',
  pink: '#DC6BE5',
  compoundGreen: '#95DE64',
  tomato: '#e56b73',
  purple: '#935dff',

  text: '#fff',
  lightBlue: '#2F80ED',
  topaz: '#0b8f92',
  darkGray: 'rgba(43,57,84,.5)',
  borderBlue: 'rgba(25, 101, 233, 0.5)',
}

const breakpoints = createBreakpoints({
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1800,
  },
})

const iswapTheme = {
  typography: {
    fontFamily: [
      '"PT Sans"',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '48px',
      fontWeight: '600',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '36px',
      fontWeight: '600',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '22px',
      fontWeight: '600',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '16px',
      fontWeight: '600',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '14px',
      fontWeight: '600',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '16px',
      fontWeight: '300',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    body2: {
      fontSize: '16px',
      fontWeight: '300',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
  },
  type: 'light',
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [PTSansFont],
      },
    },
    MuiSelect: {
      select: {
        padding: '9px',
      },
      selectMenu: {
        minHeight: '30px',
        display: 'flex',
        alignItems: 'center',
      },
    },
    MuiButton: {
      root: {
        borderRadius: '20px',
        padding: '9px 10px',
        color: colors.button.color,
      },
      outlined: {
        color: colors.button.color,
      },
      outlinedPrimary: {
        color: colors.button.color,
      },
      text: {
        padding: '10px 24px',
      },
      label: {
        textTransform: 'none',
        fontSize: '1rem',
      },
    },
    MuiInputBase: {
      input: {
        fontSize: '16px',
        fontWeight: '600',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        lineHeight: 1.2,
      },
    },
    MuiOutlinedInput: {
      input: {
        '&::placeholder': {
          color: colors.text,
        },
        color: colors.text,
        padding: '14px',
        borderRadius: '50px',
      },
      root: {
        // border: "none !important",
        borderRadius: '50px',
      },
      notchedOutline: {
        // border: "none !important"
      },
    },
    MuiSnackbar: {
      root: {
        maxWidth: 'calc(100vw - 24px)',
      },
      anchorOriginBottomLeft: {
        bottom: '12px',
        left: '12px',
        '@media (min-width: 960px)': {
          bottom: '50px',
          left: '80px',
        },
      },
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: colors.white,
        padding: '0px',
        minWidth: 'auto',
        '@media (min-width: 960px)': {
          minWidth: '500px',
        },
      },
      message: {
        padding: '0px',
      },
      action: {
        marginRight: '0px',
      },
    },
    MuiAccordion: {
      root: {
        border: '1px solid ' + colors.borderBlue,
        borderRadius: '50px',
        margin: '8px 0px',
        '&:before': {
          //underline color when textfield is inactive
          backgroundColor: 'none',
          height: '0px',
        },
      },
    },
    MuiAccordionSummary: {
      root: {
        padding: '12px 24px',
        '@media (min-width: 960px)': {
          padding: '30px 42px',
        },
      },
      content: {
        margin: '0px !important',
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: '0 12px 15px 12px',
        '@media (min-width: 960px)': {
          padding: '0 24px 30px 24px',
        },
      },
    },
    MuiToggleButton: {
      root: {
        borderRadius: '50px',
        textTransform: 'none',
        minWidth: '100px',
        border: 'none',
        background: colors.white,
        '& > span > h4': {
          color: '#555',
        },
        '&:hover': {
          backgroundColor: 'rgba(47,128,237, 0.2)',
        },
        '&$selected': {
          backgroundColor: '#2f80ed',
          '& > span > h4': {
            color: '#fff',
          },
          '&:hover': {
            backgroundColor: 'rgba(47,128,237, 0.2)',
            '& > span > h4': {
              color: '#000',
            },
          },
        },
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: 'transparent',
      },
      elevation1: {
        boxShadow: 'none',
      },
    },
    MuiToggleButtonGroup: {
      root: {
        border: '1px solid ' + colors.borderBlue,
        borderRadius: '50px',
      },
      groupedSizeSmall: {
        padding: '42px 30px',
      },
    },
    MuiFormControlLabel: {
      label: {
        color: colors.darkBlack,
        fontSize: '14px',
        fontWeight: '600',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        lineHeight: 1.2,
      },
    },
  },
  palette: {
    primary: {
      main: colors.blue,
    },
    secondary: {
      main: colors.topaz,
    },
    text: {
      primary: colors.text,
      secondary: colors.text,
    },
  },
  breakpoints: breakpoints,
  themeColors: colors,
}

export default iswapTheme
