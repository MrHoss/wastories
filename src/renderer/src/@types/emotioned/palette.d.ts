export interface TypeAction {
    active: string;
    hover: string;
    hoverOpacity: number;
    selected: string;
    selectedOpacity: number;
    disabled: string;
    disabledOpacity: number;
    disabledBackground: string;
    focus: string;
    focusOpacity: number;
    activatedOpacity: number;
}

export interface TypeBackground {
    default: string;
    paper: string;
    light: string;
    dark: string;
    contrastText: string;
}

export interface PaletteColor {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
}
export interface TypeText {
    primary: string;
    secondary: string;
    disabled: string;
}
export default interface Palette {
    mode: "light" | "dark";
    primary: PaletteColor;
    secondary: PaletteColor;
    error: PaletteColor;
    warning: PaletteColor;
    info: PaletteColor;
    success: PaletteColor;
    text: TypeText;
    gray:string;
    divider: string;
    action: TypeAction;
    background: TypeBackground;
}
