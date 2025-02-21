import * as React from 'react';
import * as CSS from 'csstype';
export type Variant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline';

export interface FontStyle {
    fontFamily: React.CSSProperties['fontFamily'];
    fontSize: {
        xsmall: string | number;
        small: string | number;
        medium: string | number;
        large: string | number;
        xlarge: string | number;
    };
    fontWeight: React.CSSProperties['fontWeight'];
    htmlFontSize: number;
}
export type NormalCssProperties = CSS.Properties<number | string>;
export type Fontface = CSS.AtRule.FontFace & { fallbacks?: CSS.AtRule.FontFace[] };
/**
 * Allows the user to augment the properties available
 */
export interface BaseCSSProperties extends NormalCssProperties {
    '@font-face'?: Fontface | Fontface[];
}

export interface CSSProperties extends BaseCSSProperties {
    // Allow pseudo selectors and media queries
    // `unknown` is used since TS does not allow assigning an interface without
    // an index signature to one with an index signature. This is to allow type safe
    // module augmentation.
    // Technically we want any key not typed in `BaseCSSProperties` to be of type
    // `CSSProperties` but this doesn't work. The index signature needs to cover
    // BaseCSSProperties as well. Usually you would use `BaseCSSProperties[keyof BaseCSSProperties]`
    // but this would not allow assigning React.CSSProperties to CSSProperties
    [k: string]: unknown | CSSProperties;
}

export default interface Mixins {
    toolbar: CSSProperties;
    // ... use interface declaration merging to add custom mixins
}