import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows, Text, Sphere, Box } from '@react-three/drei';

function FloatingLogo() {
  const ref = useRef<any>();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = 0.3 * Math.sin(t / 2);
      ref.current.rotation.x = 0.1 * Math.sin(t / 3);
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={ref} castShadow>
        <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
        <meshStandardMaterial 
          color="#2D5016" 
          metalness={0.8} 
          roughness={0.2} 
          envMapIntensity={1.5} 
        />
      </mesh>
    </Float>
  );
}

function SkillOrb({ 
  position, 
  skill, 
  color, 
  onClick 
}: { 
  position: [number, number, number]; 
  skill: string; 
  color: string; 
  onClick?: () => void; 
}) {
  const ref = useRef<any>();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.5;
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5}>
        <Sphere
          ref={ref}
          position={position}
          args={[0.4, 32, 32]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
          castShadow
        >
          <meshStandardMaterial 
            color={hovered ? color : "#4A5D23"} 
            emissive={hovered ? color : "#000000"}
            emissiveIntensity={hovered ? 0.3 : 0}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      </Float>
      {hovered && (
        <Text
          position={[position[0], position[1] + 0.8, position[2]]}
          fontSize={0.3}
          color="#2D5016"
          anchorX="center"
          anchorY="middle"
        >
          {skill}
        </Text>
      )}
    </group>
  );
}

function ArtisticElements() {
  return (
    <group>
      {/* Floating cubes representing creativity */}
      <Float speed={1} rotationIntensity={0.3}>
        <Box position={[-3, 1, -2]} args={[0.3, 0.3, 0.3]} castShadow>
          <meshStandardMaterial color="#8B4513" />
        </Box>
      </Float>
      <Float speed={1.2} rotationIntensity={0.4}>
        <Box position={[3, 0.5, -1]} args={[0.25, 0.25, 0.25]} castShadow>
          <meshStandardMaterial color="#228B22" />
        </Box>
      </Float>
      <Float speed={0.8} rotationIntensity={0.2}>
        <Box position={[2, 2.5, 1]} args={[0.2, 0.2, 0.2]} castShadow>
          <meshStandardMaterial color="#D2B48C" />
        </Box>
      </Float>
    </group>
  );
}

interface SceneProps {
  onProjectClick: (projectOrIndex: any) => void;
}

export default function Scene({ onProjectClick }: SceneProps) {
  const skills = [
    { name: 'React', position: [2, 1.5, 0] as [number, number, number], color: '#61DAFB' },
    { name: 'JavaScript', position: [-2, 1.2, 0.5] as [number, number, number], color: '#F7DF1E' },
    { name: 'CSS3', position: [1.5, 0.8, -1.5] as [number, number, number], color: '#1572B6' },
    { name: 'Design', position: [-1.8, 2, -1] as [number, number, number], color: '#FF6B6B' },
    { name: 'Art', position: [0, 2.5, 1] as [number, number, number], color: '#9B59B6' },
  ];

  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        castShadow 
        position={[8, 10, 5]} 
        intensity={1.5} 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Environment and models */}
      <Environment preset="forest" />
      
      {/* Main floating logo */}
      <FloatingLogo />
      
      {/* Skill orbs */}
      {skills.map((skill, index) => (
        <SkillOrb 
          key={skill.name}
          position={skill.position}
          skill={skill.name}
          color={skill.color}
          onClick={() => onProjectClick({ 
            title: `Compétence: ${skill.name}`, 
            summary: `Expertise en ${skill.name} - Cliquez pour en savoir plus sur mon expérience.`,
            link: skill.name === 'Design' ? 'https://issakamara-dev.netlify.app/' : undefined
          })}
        />
      ))}
      
      {/* Artistic floating elements */}
      <ArtisticElements />

      {/* Ground contact shadows */}
      <ContactShadows 
        position={[0, -1.4, 0]} 
        opacity={0.8} 
        scale={12} 
        blur={2} 
        far={4} 
      />

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2.1}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}