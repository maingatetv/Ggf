import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHouseViewerProps {
  stories?: number;
  bedrooms?: number;
  hasPool?: boolean;
  isAutoRotate?: boolean;
  nightMode?: boolean;
  styleVariant?: string;
  className?: string;
}

export const ThreeHouseViewer: React.FC<ThreeHouseViewerProps> = ({
  stories = 1,
  bedrooms = 3,
  hasPool = true,
  isAutoRotate = true,
  nightMode = false,
  styleVariant = 'Ultra Modern',
  className = 'h-72 sm:h-96 w-full',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(nightMode ? 0x0f172a : 0xf8fafc);
    scene.fog = new THREE.FogExp2(nightMode ? 0x0f172a : 0xf8fafc, 0.025);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(18, 14, 20);
    camera.lookAt(0, 2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(
      nightMode ? 0x334155 : 0xffffff,
      nightMode ? 0.9 : 1.2
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(
      nightMode ? 0x60a5fa : 0xfffbeb,
      nightMode ? 1.5 : 2.5
    );
    dirLight.position.set(20, 30, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Warm Interior lights glowing from windows
    const warmLight = new THREE.PointLight(0xf59e0b, nightMode ? 3.5 : 1.0, 15);
    warmLight.position.set(0, 3, 0);
    scene.add(warmLight);

    // House Root Group
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);

    // Ground Platform (Grass + Terrace)
    const groundGeo = new THREE.BoxGeometry(24, 0.6, 24);
    const groundMat = new THREE.MeshStandardMaterial({
      color: nightMode ? 0x1e293b : 0xe2e8f0,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.3;
    ground.receiveShadow = true;
    houseGroup.add(ground);

    // Manicured Green Lawn insert
    const lawnGeo = new THREE.BoxGeometry(22, 0.1, 22);
    const lawnMat = new THREE.MeshStandardMaterial({
      color: nightMode ? 0x14532d : 0x4ade80,
      roughness: 0.9,
    });
    const lawn = new THREE.Mesh(lawnGeo, lawnMat);
    lawn.position.y = 0.05;
    lawn.receiveShadow = true;
    houseGroup.add(lawn);

    // Swimming Pool if requested
    if (hasPool) {
      const poolGeo = new THREE.BoxGeometry(7, 0.2, 4);
      const poolMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.1,
        metalness: 0.3,
      });
      const pool = new THREE.Mesh(poolGeo, poolMat);
      pool.position.set(6, 0.12, 6);
      houseGroup.add(pool);

      // Pool Deck
      const deckGeo = new THREE.BoxGeometry(8.5, 0.15, 5.5);
      const deckMat = new THREE.MeshStandardMaterial({
        color: 0xd97706, // teak wood
        roughness: 0.6,
      });
      const deck = new THREE.Mesh(deckGeo, deckMat);
      deck.position.set(6, 0.08, 6);
      houseGroup.add(deck);
    }

    // Colors according to luxury aesthetic
    const wallColor = 0xffffff; // Crisp white
    const accentColor = 0xd97706; // Rich warm wood/gold
    const darkWoodColor = 0x1e293b; // Charcoal trim
    const glassColor = nightMode ? 0xf59e0b : 0x93c5fd; // Glowing gold at night, sky reflection in day

    const wallMat = new THREE.MeshStandardMaterial({
      color: wallColor,
      roughness: 0.5,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: darkWoodColor,
      roughness: 0.4,
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: glassColor,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.85,
    });
    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      roughness: 0.3,
      metalness: 0.5,
    });

    const houseWidth = 10 + Math.min(bedrooms, 6) * 0.8;
    const houseDepth = 8;
    const storyHeight = 3.2;

    // Build Floors according to stories prop
    for (let s = 0; s < stories; s++) {
      const floorY = s * storyHeight + storyHeight / 2;
      const isTopFloor = s === stories - 1;

      // Main Block
      const blockWidth = s === 0 ? houseWidth : houseWidth * 0.85;
      const blockGeo = new THREE.BoxGeometry(blockWidth, storyHeight - 0.2, houseDepth);
      const mainBlock = new THREE.Mesh(blockGeo, wallMat);
      mainBlock.position.set(s === 0 ? 0 : -0.8, floorY, 0);
      mainBlock.castShadow = true;
      mainBlock.receiveShadow = true;
      houseGroup.add(mainBlock);

      // Accent Timber Screen / Feature Wall
      const featureGeo = new THREE.BoxGeometry(2.5, storyHeight - 0.2, 0.3);
      const feature = new THREE.Mesh(featureGeo, goldAccentMat);
      feature.position.set(s === 0 ? -houseWidth / 3 : 0, floorY, houseDepth / 2 + 0.1);
      houseGroup.add(feature);

      // Large Ribbon Glass Windows (Front)
      const windowGeo = new THREE.BoxGeometry(blockWidth * 0.45, storyHeight * 0.55, 0.2);
      const windowMesh = new THREE.Mesh(windowGeo, glassMat);
      windowMesh.position.set(1.5, floorY, houseDepth / 2 + 0.12);
      houseGroup.add(windowMesh);

      // Floor Slab Cantilever / Balcony
      const slabGeo = new THREE.BoxGeometry(blockWidth + 1.2, 0.25, houseDepth + 1.2);
      const slab = new THREE.Mesh(slabGeo, darkMat);
      slab.position.set(s === 0 ? 0 : -0.8, (s + 1) * storyHeight, 0);
      slab.castShadow = true;
      houseGroup.add(slab);

      // Glass Balcony Railing for Upper Stories
      if (s > 0) {
        const railGeo = new THREE.BoxGeometry(blockWidth + 1.2, 0.8, 0.05);
        const rail = new THREE.Mesh(railGeo, glassMat);
        rail.position.set(-0.8, (s + 1) * storyHeight + 0.4, houseDepth / 2 + 0.6);
        houseGroup.add(rail);
      }

      // Modern Flat Parapet / Rooftop Terrace on top floor
      if (isTopFloor) {
        const parapetGeo = new THREE.BoxGeometry(blockWidth + 0.6, 0.6, houseDepth + 0.6);
        const parapet = new THREE.Mesh(parapetGeo, darkMat);
        parapet.position.set(s === 0 ? 0 : -0.8, (s + 1) * storyHeight + 0.3, 0);
        houseGroup.add(parapet);

        // Solar panels array on roof
        const solarGeo = new THREE.BoxGeometry(blockWidth * 0.5, 0.1, houseDepth * 0.5);
        const solarMat = new THREE.MeshStandardMaterial({
          color: 0x1e3a8a,
          roughness: 0.2,
          metalness: 0.8,
        });
        const solar = new THREE.Mesh(solarGeo, solarMat);
        solar.position.set(s === 0 ? 0 : -0.8, (s + 1) * storyHeight + 0.4, 0);
        houseGroup.add(solar);
      }
    }

    // Modern Carport & Driveway
    const driveGeo = new THREE.BoxGeometry(5, 0.08, 10);
    const driveMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.9 });
    const drive = new THREE.Mesh(driveGeo, driveMat);
    drive.position.set(-8, 0.06, 6);
    houseGroup.add(drive);

    // Carport Pergola Pillars & Beams
    const carportPillar1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 0.3), darkMat);
    carportPillar1.position.set(-10, 1.5, 3);
    houseGroup.add(carportPillar1);

    const carportPillar2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3, 0.3), darkMat);
    carportPillar2.position.set(-6, 1.5, 3);
    houseGroup.add(carportPillar2);

    const carportRoof = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.2, 5), goldAccentMat);
    carportRoof.position.set(-8, 3, 3);
    houseGroup.add(carportRoof);

    // Landscaping Trees
    const treeGeo = new THREE.ConeGeometry(1.2, 3.5, 6);
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
    const trunkGeo = new THREE.CylinderGeometry(0.2, 0.2, 1, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f });

    [
      { x: -9, z: -7 },
      { x: 8, z: -7 },
      { x: 9.5, z: 0 },
    ].forEach((pos) => {
      const tree = new THREE.Mesh(treeGeo, treeMat);
      tree.position.set(pos.x, 2.5, pos.z);
      tree.castShadow = true;
      houseGroup.add(tree);

      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(pos.x, 0.5, pos.z);
      houseGroup.add(trunk);
    });

    // Animation Loop
    let animationFrameId: number;
    let rotationSpeed = 0.007;

    // Mouse / Touch Drag interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      houseGroup.rotation.y += deltaX * 0.01;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      houseGroup.rotation.y += deltaX * 0.015;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    domElement.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isAutoRotate && !isDragging) {
        houseGroup.rotation.y += rotationSpeed;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [stories, bedrooms, hasPool, isAutoRotate, nightMode, styleVariant]);

  return <div ref={mountRef} className={`relative overflow-hidden rounded-2xl ${className}`} />;
};
