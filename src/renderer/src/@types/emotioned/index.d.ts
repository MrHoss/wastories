import '@emotion/react';
import Palette from './palette';
import Typography, { CSSProperties } from './typography';
import { Shadows } from './shadows';
import { Transitions } from './transitions';
import Mixins from './mixins';
import ZIndex from './zindex';
import { Interpolation } from '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        mixins:Mixins;
        palette:Palette;
        shadows:Shadows;
        transitions:Transitions;
        typography: Typography;
        zIndex:ZIndex;
        spacing: {
            xsmall: string|number;
            small: string | number;
            medium: string | number;
            large: string | number;
            xlarge: string | number;
        };
        components:{
            [componentIdentifier: string]:{
                defaultProps?:any;
                styleOverrides?:CSSProperties;
                variants?:any;
            }
        }
        styleOverrides?: Interpolation<Theme>;
    }
}
