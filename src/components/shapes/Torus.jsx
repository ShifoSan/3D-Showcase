import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Rotating Torus Component
 * Features: Multi-axis rotation, rainbow color shifts, metallic appearance
 * Active in Section 2 (scroll progress 0.66-1.0)
 */
export const Torus = ({ scrollProgress, mousePos, isActive }) => {
    const meshRef = useRef();
    const materialRef = useRef();

    // Uniforms for color animation
    const uniforms = useMemo(
        () => ({
            time: { value: 0 },
            colorShift: { value: 0 },
        }),
        []
    );

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        // Multi-axis rotation
        meshRef.current.rotation.x = time * 0.5 + scrollProgress * Math.PI;
        meshRef.current.rotation.y = time * 0.4 + scrollProgress * Math.PI * 1.5;
        meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.2;

        // Mouse parallax with more dramatic effect
        meshRef.current.position.x = mousePos.x * 1.2;
        meshRef.current.position.y = mousePos.y * 0.8;

        // Scale animation
        const targetScale = isActive ? 1.8 : 0.3;
        meshRef.current.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.05
        );

        // Update color shift
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = time;
            materialRef.current.uniforms.colorShift.value = scrollProgress * 10;
        }
    });

    // Vertex shader
    const vertexShader = `
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    // Fragment shader with rainbow color shift
    const fragmentShader = `
    uniform float time;
    uniform float colorShift;
    varying vec3 vPosition;
    varying vec3 vNormal;

    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main() {
      // Rainbow effect based on position and time
      float hue = fract(vPosition.x * 0.3 + vPosition.y * 0.3 + time * 0.1 + colorShift * 0.1);
      vec3 color = hsv2rgb(vec3(hue, 0.8, 1.0));
      
      // Simple lighting
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
      float diff = max(dot(vNormal, lightDir), 0.3);
      
      color *= diff;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <torusGeometry args={[1.5, 0.6, 32, 100]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
};
