import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Morphing Sphere Component
 * Features: Wave distortion with custom shader, color gradients, rotation, mouse reactivity
 * Active in Section 1 (scroll progress 0.33-0.66)
 */
export const Sphere = ({ scrollProgress, mousePos, isActive }) => {
    const meshRef = useRef();
    const materialRef = useRef();

    // Custom shader for wave distortions
    const uniforms = useMemo(
        () => ({
            time: { value: 0 },
            colorA: { value: new THREE.Color('#a78bfa') },
            colorB: { value: new THREE.Color('#ec4899') },
            mouseX: { value: 0 },
            mouseY: { value: 0 },
        }),
        []
    );

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        // Update shader uniforms
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = time;
            materialRef.current.uniforms.mouseX.value = mousePos.x;
            materialRef.current.uniforms.mouseY.value = mousePos.y;
        }

        // Rotation based on scroll and time
        meshRef.current.rotation.x = time * 0.3 + scrollProgress * Math.PI;
        meshRef.current.rotation.y = time * 0.2 + scrollProgress * Math.PI * 2;

        // Mouse parallax
        meshRef.current.position.x = mousePos.x * 0.8;
        meshRef.current.position.y = mousePos.y * 0.5;

        // Scale based on active state
        const targetScale = isActive ? 2 : 0.3;
        meshRef.current.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.05
        );
    });

    // Vertex shader for wave distortion
    const vertexShader = `
    uniform float time;
    uniform float mouseX;
    uniform float mouseY;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      
      // Wave distortion
      float wave = sin(pos.x * 2.0 + time) * 0.1;
      wave += sin(pos.y * 3.0 + time * 1.5) * 0.1;
      wave += sin(pos.z * 2.5 + time * 0.8) * 0.1;
      
      // Mouse influence
      wave += sin(mouseX * 5.0 + time) * 0.05;
      wave += cos(mouseY * 5.0 + time) * 0.05;
      
      pos += normalize(pos) * wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

    // Fragment shader for gradient coloring
    const fragmentShader = `
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      // Gradient based on position and time
      float mixValue = (sin(vPosition.y * 2.0 + time) + 1.0) * 0.5;
      vec3 color = mix(colorA, colorB, mixValue);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <sphereGeometry args={[1.5, 64, 64]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                wireframe={false}
            />
        </mesh>
    );
};
