# React Bits Component Props Guide

This document provides a guide to the configurable props for the React Bits components integrated into the **SquareNine Oracle** project. These components are used to enhance the project's visual appeal and user experience, aligning with the "digital sanctuary" and "mystical" themes.

## Particles Component Props

The `Particles` component creates an animated particle background to add ambient visual flair.

*   **Source:** The code for this component (`Particles.tsx` and `Particles.css`) was added directly to the project, likely in the `/src/components/ui/` directory.
*   **Integration:** This component is integrated into the main `Layout` component (`/src/components/layout/Layout.tsx`) as a background layer.
*   **Dependency:** This component has a dependency on the `ogl` library, which needs to be installed separately (`npm install ogl`).

## Particles Component Props

The `Particles` component creates an animated particle background. It can be configured using the following props:

*   `particleCount`: `number` (default: 200) - The number of particles to render.
*   `particleSpread`: `number` (default: 10) - Controls how spread out the particles are.
*   `speed`: `number` (default: 0.1) - Sets the animation speed of the particles.
*   `particleColors`: `string[]` - An array of hex color strings (e.g., `["#ffffff", "#cccccc"]`) for the particles. Defaults to an array of white colors if not provided.
*   `moveParticlesOnHover`: `boolean` (default: false) - Enables or disables particle movement based on mouse hover position.
*   `particleHoverFactor`: `number` (default: 1) - Controls the intensity of particle movement on hover.
*   `alphaParticles`: `boolean` (default: false) - Enables or disables alpha transparency for the particles, creating a softer look.
*   `particleBaseSize`: `number` (default: 100) - Sets the base size of the particles.
*   `sizeRandomness`: `number` (default: 1) - Controls the randomness in particle size.
*   `cameraDistance`: `number` (default: 20) - Sets the distance of the virtual camera from the particle system.
*   `disableRotation`: `boolean` (default: false) - Disables the subtle rotation animation of the particle system.
*   `className`: `string` (default: "") - Additional CSS classes to apply to the component's container `div`.

## SpotlightCard Component Props

The `SpotlightCard` component provides a radial gradient spotlight effect that follows the mouse cursor on hover.

*   **Source:** This component was installed using the `jsrepo add` command. Its files are likely located in the `jsrepo` blocks directory (e.g., `./src/blocks/Components/SpotlightCard/`).
*   **Integration:** This component is integrated into the `GridCell` component (`/src/components/ui/GridCell.tsx`), wrapping the content of each grid tile.


The `SpotlightCard` component provides a radial gradient spotlight effect that follows the mouse cursor on hover. It can be configured using the following props:

*   `children`: `React.ReactNode` - The content to be wrapped by the `SpotlightCard`.
*   `className`: `string` (default: "") - Additional CSS classes to apply to the component's main `div`.
*   `spotlightColor`: `string` (default: "rgba(255, 255, 255, 0.25)") - The color of the radial gradient spotlight effect. Accepts any valid CSS color value, typically an `rgba()` value to include transparency.