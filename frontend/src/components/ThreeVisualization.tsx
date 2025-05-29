import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeVisualizationProps {
  earnedMinutes: number;
  usedMinutes: number;
  maxMinutes?: number;
}

export const ThreeVisualization: React.FC<ThreeVisualizationProps> = ({
  earnedMinutes,
  usedMinutes,
  maxMinutes = 480 // 8 hours default
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | undefined>(undefined);
  const rendererRef = useRef<THREE.WebGLRenderer | undefined>(undefined);
  const frameId = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create progress bars
    const earnedProgress = Math.min(earnedMinutes / maxMinutes, 1);
    const usedProgress = Math.min(usedMinutes / maxMinutes, 1);

    // Earned time bar (green)
    const earnedGeometry = new THREE.BoxGeometry(2, earnedProgress * 3, 0.2);
    const earnedMaterial = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const earnedBar = new THREE.Mesh(earnedGeometry, earnedMaterial);
    earnedBar.position.set(-1.2, (earnedProgress * 3) / 2 - 1.5, 0);
    scene.add(earnedBar);

    // Used time bar (purple)
    const usedGeometry = new THREE.BoxGeometry(2, usedProgress * 3, 0.2);
    const usedMaterial = new THREE.MeshBasicMaterial({ color: 0x8b5cf6 });
    const usedBar = new THREE.Mesh(usedGeometry, usedMaterial);
    usedBar.position.set(1.2, (usedProgress * 3) / 2 - 1.5, 0);
    scene.add(usedBar);

    // Background bars
    const bgGeometry = new THREE.BoxGeometry(2, 3, 0.1);
    const bgMaterial = new THREE.MeshBasicMaterial({ color: 0xe5e7eb });
    
    const earnedBg = new THREE.Mesh(bgGeometry, bgMaterial);
    earnedBg.position.set(-1.2, 0, -0.1);
    scene.add(earnedBg);

    const usedBg = new THREE.Mesh(bgGeometry, bgMaterial);
    usedBg.position.set(1.2, 0, -0.1);
    scene.add(usedBg);

    // Labels using sprite
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 256;
    canvas.height = 64;
    context.fillStyle = '#374151';
    context.font = '20px Arial';
    context.textAlign = 'center';
    context.fillText('Earned', 64, 35);
    context.fillText('Used', 192, 35);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(0, -2.5, 0);
    sprite.scale.set(4, 1, 1);
    scene.add(sprite);

    // Animation loop
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);
      
      // Rotate bars slightly
      earnedBar.rotation.y += 0.01;
      usedBar.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [earnedMinutes, usedMinutes, maxMinutes]);

  return (
    <div
      ref={mountRef}
      className="w-full h-40 rounded-xl overflow-hidden bg-gray-100"
    />
  );
};