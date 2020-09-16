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

const snackbarColors = {
  title: '#000',
  subtitle: '#000',
  background: '#fff',
  infoIcon: '#000',
  warnIcon: '#000',
  errorIcon: '#000',
  hashIcon: '#000',
  successIcon: '#000',
  closeIcon: '#000',
}

export const colors = {
  beta: {
    bg: '#F7F9FC',
    color: '#252626',
    shadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
    close: '#1890FF',
  },
  home: {
    text: '#262626',
    bg: '#f7f9fc',
    hover: '#f7f9fc',
  },
  button: {
    bg: 'linear-gradient(100.35deg, #369EFF 0%, #096DD9 100%)',
    color: '#096DD9',
    hover: '#fff',
    border: '1px solid #096DD9',
    shadow: 'none',
  },
  wallet: {
    dot: '#E3E5E8',
    dotSelected: 'linear-gradient(100.35deg, #369EFF 0%, #096DD9 100%)',
    button: {
      bg: '#E3E5E8',
      shadow: '0px 0px 1px rgba(0, 0, 0, 0.25)',
      hover: '#E3E5E8',
    },
  },
  header: {
    text: '#080809',
    connect: {
      border: '1px solid #3a9dfe',
      bg: '#E3E5E8',
      shadow: '0px 0px 1px rgba(0, 0, 0, 0.25)',
      hover: 'rgba(47, 128, 237, 0.1)',
      arrow: '6px solid #818FA6',
    },
  },
  glowShadow: 'none',
  textShadow: 'none',
  connectedShadow: 'none',
  footer: {
    gradient: 'none',
    bg: '#F7F9FC',
    link: '#080809',
    title: '#888A8C',
    icon: '#1890FF',
  },
  chooser: {
    bg: '#E3E5E8',
    activeBg: '#DCDDE0',
    activeShadow: 'inset 0px 0px 2px rgba(0, 0, 0, 0.25)',
    iconDark: '#354154',
    iconLight: '#1890FF',
    iconWaifu: '#F3DEFF',
    iconWaifuBg: '#9551BA',
  },
  bg: '#f7f9fc',
  bgImage: 'none',
  headerBg: '#f7f9fc',
  popup: {
    bg: '#FFF',
    text: '#080809',
    border: '1px solid #1890FF',
  },
  icon: {
    color: '#BAE7FF',
    glow: 'drop-shadow(0px 0px 10px #40A9FF)',
  },
  page: {
    zap: {
      inputLabel: '#818FA6',
    },
    apr: {
      tableTh: '#000',
    },
    header: {
      title: '#1890FF',
      text: '#080809',
      icon: '#1890FF',
      glow: 'none',
      linear: {
        color: '#69C0FF',
        middle: '#40A9FF',
      },
      bgGlow: 'radial-gradient(52.66% 50.98% at 50% 0%, rgba(64, 169, 255, 0.15) 0%, rgba(64, 169, 255, 0) 89.58%)',
    },
    filter: {
      checkbox: {
        bg: '#FFFFFF',
        border: '1px solid #1890FF',
        label: '#1890FF',
      },
      input: {
        icon: '#575859',
        placeholder: '#575859',
        color: '#080809',
        bg: '#E3E5E8',
        borderColor: 'none',
        border: '0',
        boxShadow: 'none',
        hoverShadow: 'none',
      },
      sort: {
        option: '#000',
        arrow: '6px solid #888A8C',
        label: '#888A8C',
        select: '#080809',
      },
    },
    asset: {
      shadow: 'none',
      color: '#080809',
      description: '#575859',
      arrow: '7px solid #818FA6',
      apy: {
        bg: '#F7F9FC',
        title: '#888A8C',
        cellTitle: '#575859',
        description: '#080809',
        link: '#1890FF',
        middleLinear: '#E3E5E8',
        middleId: 'light',
      },
      linear: {
        color: '#69C0FF',
        middle: '#40A9FF',
        apyMiddle: '#394861',
        id: 'light',
      },
      input: {
        bg: '#E3E5E8',
        border: 'none',
        shadow: 'none',
        color: '#080809',
      },
      balance: '#FFF',
      button: {
        bg: 'linear-gradient(100.35deg, #369EFF 0%, #096DD9 100%)',
        shadow: 'none',
        color: '#FFF',
        disabled: {
          bg: '#bfbfbf',
          color: '#fff',
        },
      },
      slider: {
        percent: '#080809',
        percentWeight: 'bold',
        rail: '#F0F2F5',
        track: 'linear-gradient(280.6deg, #91D1FF 1.98%, #BBE4FF 100%)',
        mark: '#CDD0D4',
        activeMark: '#40A9FF',
        thumb: {
          bg: '#E6F7FF',
          border: '2px solid #40A9FF',
          filter: 'none',
        },
        value: {
          color: '#1890FF',
          glow: 'none',
        },
      },
    },
  },
  white: '#fff',
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
  compoundGreen: '#46B96E',
  connectGreen: '#52C41A',
  tomato: '#e56b73',
  purple: '#935dff',
  text: '#212529',
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
        padding: '7px 10px',
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
        backgroundColor: snackbarColors.background,
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
        backgroundColor: colors.popup.bg,
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
  snackbar: snackbarColors,
}

export default iswapTheme
