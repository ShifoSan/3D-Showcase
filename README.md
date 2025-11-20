# 3D Showcase - Immersive Web Experience

A high-end, dynamic showcase web page built with React, Three.js, and React Three Fiber featuring scroll-based 3D animations, mouse parallax effects, and scrollytelling sections.

## ✨ Features

- **3D Animated Shapes**: Wireframe icosahedron, morphing sphere with custom shaders, and rotating torus with rainbow effects
- **Scroll-Based Animations**: Shapes smoothly transition and animate as you scroll through the page
- **Mouse Parallax**: 3D objects react to mouse movement with physics-based damping
- **Scrollytelling**: Content sections fade in and out, synchronized with 3D visuals
- **Interactive Controls**: Navigation dots and restart button for easy section jumping
- **Fully Responsive**: Optimized for both desktop and mobile devices
- **High Performance**: Smooth 60fps animations with optimized rendering

## 🚀 Quick Start

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The site will open automatically at `http://localhost:5173`

### Build for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
3d-showcase/
├── src/
│   ├── components/
│   │   ├── Scene.jsx              # Main 3D canvas container
│   │   ├── Controls.jsx           # Navigation controls
│   │   ├── shapes/                # 3D shape components
│   │   │   ├── Icosahedron.jsx   # Wireframe icosahedron
│   │   │   ├── Sphere.jsx        # Morphing sphere with shaders
│   │   │   └── Torus.jsx         # Rotating rainbow torus
│   │   └── sections/              # Scrollytelling content
│   │       ├── Section1.jsx      # Introduction
│   │       ├── Section2.jsx      # Features
│   │       └── Section3.jsx      # Call to action
│   ├── hooks/
│   │   ├── useScrollProgress.js  # Scroll tracking hook
│   │   └── useMouseParallax.js   # Mouse parallax hook
│   ├── App.jsx                    # Main app component
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Customization Guide

### Editing Text Content

All text content is located in the section components:

- **Section 1 (Introduction)**: `src/components/sections/Section1.jsx`
- **Section 2 (Features)**: `src/components/sections/Section2.jsx`
- **Section 3 (CTA)**: `src/components/sections/Section3.jsx`

Simply edit the text within the JSX to customize your content.

### Customizing 3D Shapes

#### Colors

**Icosahedron** (`src/components/shapes/Icosahedron.jsx`):
- Line 46: Change wireframe color
  ```jsx
  color="#a78bfa"  // Change this hex value
  ```

**Sphere** (`src/components/shapes/Sphere.jsx`):
- Lines 19-20: Change gradient colors
  ```jsx
  colorA: { value: new THREE.Color('#a78bfa') },
  colorB: { value: new THREE.Color('#ec4899') },
  ```

**Torus** (`src/components/shapes/Torus.jsx`):
- Uses rainbow shader by default. To use solid colors, replace the shader material with:
  ```jsx
  <meshStandardMaterial color="#a78bfa" metalness={0.8} roughness={0.2} />
  ```

#### Animation Speed

In each shape component, adjust the rotation multipliers in the `useFrame` hook:

```jsx
meshRef.current.rotation.x = time * 0.2;  // Lower = slower
meshRef.current.rotation.y = time * 0.15; // Higher = faster
```

#### Scale & Size

**Icosahedron**:
- Line 42: `<icosahedronGeometry args={[2, 0]} />` - First arg is radius

**Sphere**:
- Line 103: `<sphereGeometry args={[1.5, 64, 64]} />` - First arg is radius

**Torus**:
- Line 96: `<torusGeometry args={[1.5, 0.6, 32, 100]} />` - First two args are radius and tube thickness

### Adjusting Mouse Parallax

In `src/App.jsx`, line 12:
```jsx
const mousePos = useMouseParallax(0.1); // Increase for faster response, decrease for smoother/slower
```

In each shape component, adjust the parallax multipliers:
```jsx
meshRef.current.position.x = mousePos.x * 0.5; // Increase for more dramatic effect
meshRef.current.position.y = mousePos.y * 0.3;
```

### Changing Background Colors

Edit `src/index.css`, lines 2-4:
```css
--color-bg-gradient-start: #1a0d2e;  /* Top gradient color */
--color-bg-gradient-end: #0a0a0f;    /* Bottom gradient color */
```

### Adding More Sections

1. Create a new section component in `src/components/sections/`
2. Create a new 3D shape component in `src/components/shapes/`
3. Update `src/App.jsx` to include the new section
4. Update `src/hooks/useScrollProgress.js` to adjust section ranges
5. Update `src/components/Controls.jsx` to add a new navigation dot
6. Adjust the scroll container height in `src/index.css` (line 42)

## 🎯 Performance Tips

- **Mobile Optimization**: The canvas automatically adjusts DPI for mobile devices
- **Shader Complexity**: If performance is slow, reduce sphere geometry segments (line 103 in Sphere.jsx)
- **Particle Count**: For additional effects, keep particle counts under 10,000 for mobile
- **Debug Performance**: Add `<Stats />` from `@react-three/drei` inside the Canvas to monitor FPS

## 🛠 Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helper utilities for R3F
- **Custom GLSL Shaders** - Advanced visual effects

## 📝 License

This project is open source and available for personal and commercial use.

## 🙋 Support

For issues or questions:
1. Check the customization guide above
2. Review the code comments in each component
3. Consult the [React Three Fiber documentation](https://docs.pmnd.rs/react-three-fiber)

---

**Created with ❤️ using React and Three.js**
