import { Theme } from "@emotion/react";
//import "../assets/fonts/roboto/styles.css";
import WavyLinesSvg from "@renderer/assets/wavy-lines.svg";

export const dark: Theme = {
  styleOverrides: {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    '*::before': {
      boxSizing: 'border-box',
    },
    '*::after': {
      boxSizing: 'border-box',
    },
    body: {
      margin: 0,
      fontFamily: 'Cantarell, Arial',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      backgroundColor: '#282828',
      backgroundRepeat:'no-repeat',
      backgroundImage: `url(${WavyLinesSvg})`,
      backgroundSize: 'cover',
      color: '#f5f5f5',
    },
    a: {
      textDecoration: 'none',
      color: 'inherit',
    },
    button: {
      cursor: 'pointer',
    },
  },
  palette: {
    mode: "dark",
    primary: {
      light: "#8ADCFD",
      main: "#46BEF0",
      dark: "#1E2E3F",
      contrastText: "#FFF"
    },
    secondary: {
      main: "#f44336",
      light: '#ff867e',
      dark: '#c50b28',
      contrastText: '#FFF'
    },
    error: {
      main: '#E73145',
      light: '#FF6A70',
      dark: '#AD001E',
      contrastText: '#FFF'
    },
    warning: {
      main: '#F39711',
      light: '#FFC84C',
      dark: '#BB6900',
      contrastText: '#FFF'
    },
    info: {
      main: '#497BB8',
      light: '#506C8E',
      dark: "",
      contrastText: '#FFF'
    },
    success: {
      main: '#3BD2A2',
      light: '#78FFD3',
      dark: '#00A073',
      contrastText: '#FFF'
    },
    text: {
      primary: '#ffffff',
      secondary: '#c1c1c1',
      disabled: '#8696a0',
    },
    background: {
      default: "#0F1214",
      paper: "#101316",
      light: "#182232",
      dark: "#0F1214",
      contrastText: "#f5f5f5"
    },
    gray: "gray",
    divider: "#3d47514d",
    action: {
      active: "#0F1214",
      hover: "#14181B",
      hoverOpacity: 1,
      selected: "#1D2126",
      selectedOpacity: 1,
      disabled: "#797979",
      disabledOpacity: 1,
      disabledBackground: "#8595A6",
      focus: "",
      focusOpacity: 1,
      activatedOpacity: 1
    }
  },
  spacing: {
    xsmall: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 48
  },
  typography: {
    button: {},
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    caption: {},
    overline: {},
    fontFamily: 'Roboto, Arial',
    fontSize: {
      xsmall: "",
      small: "",
      medium: "",
      large: "",
      xlarge: ""
    },
    fontWeight: "bold",
    htmlFontSize: 0
  },
  mixins: {
    toolbar: {}
  },
  shadows: [
    "rgb(9, 11, 11) 2px 2px 4px 0px",
    "rgba(48, 56, 64, 0.1) 0px 2px 0px inset, rgb(9, 11, 11) 0px -2px 0px inset, rgb(9, 11, 11) 0px 1px 2px 0px",
    "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
  ],
  transitions: {
    easing: {
      easeInOut: "",
      easeOut: "",
      easeIn: "",
      sharp: ""
    },
    duration: {
      shortest: 0,
      shorter: 0,
      short: 0,
      standard: 0,
      complex: 0,
      enteringScreen: 0,
      leavingScreen: 0
    }
  },
  zIndex: {
    mobileStepper: 0,
    speedDial: 0,
    appBar: 0,
    drawer: 0,
    modal: 0,
    snackbar: 0,
    tooltip: 0,
    fab: 0
  },
  components: {
    IconButtonLink: {
      styleOverrides: {
        borderRadius: 12
      }
    }
  }
}