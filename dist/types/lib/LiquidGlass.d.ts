import { HTMLAttributes, ReactNode } from 'react';
export type LiquidGlassRef = HTMLDivElement;
export interface LiquidGlassProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    children?: ReactNode;
    /**
     * Strength of the diffusion layer between 0 (disabled) and 1 (maximum).
     */
    intensity?: number;
    /**
     * Base tint used for the glass surface. Accepts any valid CSS color value.
     */
    tint?: string;
    /**
     * Highlight color blended into the glass sheen.
     */
    highlightColor?: string;
    /**
     * Strength of the highlight between 0 (hidden) and 1 (fully visible).
     */
    highlightStrength?: number;
    /**
     * Blur radius applied to the glass pane in pixels.
     */
    blurRadius?: number;
    /**
     * Opacity of the organic distortion noise between 0 and 1.
     */
    ripple?: number;
    /**
     * Enables subtle motion cues for the highlight and noise layers.
     */
    animated?: boolean;
    /**
     * Enables the SVG displacement filter beneath the surface.
     */
    distortion?: boolean;
    /**
     * Identifier of the SVG filter that should be used for displacement.
     */
    distortionFilterId?: string;
    /**
     * Intensity scale forwarded to the displacement filter.
     */
    distortionScale?: number;
}
export declare const LiquidGlass: import('react').ForwardRefExoticComponent<LiquidGlassProps & import('react').RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LiquidGlass.d.ts.map