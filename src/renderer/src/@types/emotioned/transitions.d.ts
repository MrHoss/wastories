
export interface Easing {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
}

export interface Duration {
    shortest: number;
    shorter: number;
    short: number;
    standard: number;
    complex: number;
    enteringScreen: number;
    leavingScreen: number;
}
export interface Transitions {
    easing: Easing;
    duration: Duration;
}