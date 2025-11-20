import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Wireframe Icosahedron Component
 * Features: Wireframe edges, pulsing animation, rotation based on scroll, mouse parallax
 * Active in Section 0 (scroll progress 0-0.33)
 */
export const Icosahedron = ({ scrollProgress, mousePos, isActive }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;

        // Calculate base rotation with time
        const time = state.clock.getElapsedTime();

        // Smooth rotation
        meshRef.current.rotation.x = time * 0.2 + scrollProgress * Math.PI * 2;
        meshRef.current.rotation.y = time * 0.15 + scrollProgress * Math.PI;

        // Mouse parallax effect
        meshRef.current.position.x = mousePos.x * 0.5;
        meshRef.current.position.y = mousePos.y * 0.3;

        // Pulsing scale effect
        const pulse = Math.sin(time * 2) * 0.1 + 1;
        const targetScale = isActive ? pulse * 1.2 : 0.3;

        // Smooth scale transition
        meshRef.current.scale.lerp(
            new THREE.Vector3(targetScale, targetScale, targetScale),
            0.05
        );

        // Fade opacity based on active state
        if (meshRef.current.material) {
            const targetOpacity = isActive ? 1 : 0.2;
            meshRef.current.material.opacity += (targetOpacity - meshRef.current.material.opacity) * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[2, 0]} />
            <meshBasicMaterial
                color="#a78bfa"
                wireframe={true}
                transparent={true}
                opacity={1}
            />
        </mesh>
    );
};
