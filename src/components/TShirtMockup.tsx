import React, { useRef, useEffect } from 'react';
import { Position, TShirtColor, Design, PrintSize, TShirtView } from '../types';

interface TShirtMockupProps {
  color: TShirtColor;
  printSize: PrintSize;
  designs: Design[];
  onDesignUpdate: (id: string, updates: Partial<Design>) => void;
  onDesignSelect: (id: string) => void;
  selectedDesignId: string | null;
  currentView: TShirtView;
}

const TShirtMockup: React.FC<TShirtMockupProps> = ({
  color,
  printSize,
  designs,
  onDesignUpdate,
  onDesignSelect,
  selectedDesignId,
  currentView
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const transformRef = useRef<{
    isDragging: boolean;
    isScaling: boolean;
    isRotating: boolean;
    startX: number;
    startY: number;
    startAngle: number;
    startScale: number;
    activeHandle: string | null;
    designWidth: number;
    designHeight: number;
  }>({
    isDragging: false,
    isScaling: false,
    isRotating: false,
    startX: 0,
    startY: 0,
    startAngle: 0,
    startScale: 1,
    activeHandle: null,
    designWidth: 100,
    designHeight: 100
  });

  const printSizeConstraints = {
    A4: { width: 160, height: 200, label: '10" × 12"', price: 110 },
    A3: { width: 180, height: 240, label: '14" × 16"', price: 180 },
    A2: { width: 200, height: 280, label: '16" × 20"', price: 230 }
  };

  const colorMap = {
    white: '#ffffff',
    black: '#000000',
    navy: '#1e3a8a',
    gray: '#4b5563',
    red: '#dc2626',
  };

  // Enhanced t-shirt paths for different views
  const tshirtPaths = {
    front: `
      M 120,50 
      L 280,50 
      C 300,50 320,70 330,90 
      L 380,200 
      L 350,220 
      L 330,120 
      C 330,120 320,380 310,420 
      C 300,460 100,460 90,420 
      C 80,380 70,120 70,120 
      L 50,220 
      L 20,200 
      L 70,90 
      C 80,70 100,50 120,50 
      Z
    `,
    back: `
      M 120,50 
      L 280,50 
      C 300,50 320,70 330,90 
      L 380,200 
      L 350,220 
      L 330,120 
      C 330,120 320,380 310,420 
      C 300,460 100,460 90,420 
      C 80,380 70,120 70,120 
      L 50,220 
      L 20,200 
      L 70,90 
      C 80,70 100,50 120,50 
      Z
    `,
    left: `
      M 150,50 
      C 150,50 180,50 200,50 
      L 200,420 
      C 200,460 120,460 100,420 
      C 90,380 80,120 80,120 
      L 60,220 
      L 30,200 
      L 80,90 
      C 90,70 110,50 150,50 
      Z
    `,
    right: `
      M 250,50 
      C 250,50 220,50 200,50 
      L 200,420 
      C 200,460 280,460 300,420 
      C 310,380 320,120 320,120 
      L 340,220 
      L 370,200 
      L 320,90 
      C 310,70 290,50 250,50 
      Z
    `
  };

  // Enhanced collar paths
  const collarPaths = {
    front: `
      M 140,50 
      C 140,65 160,80 200,80 
      C 240,80 260,65 260,50
      M 140,50 
      C 140,55 150,65 200,65 
      C 250,65 260,55 260,50
    `,
    back: `
      M 140,50 
      C 140,65 160,80 200,80 
      C 240,80 260,65 260,50
      M 140,50 
      C 140,55 150,65 200,65 
      C 250,65 260,55 260,50
    `,
    left: `
      M 150,50 
      C 150,65 170,80 200,80
      M 150,50 
      C 150,55 160,65 200,65
    `,
    right: `
      M 250,50 
      C 250,65 230,80 200,80
      M 250,50 
      C 250,55 240,65 200,65
    `
  };

  // Enhanced sleeve detail paths
  const sleevePaths = {
    front: `
      M 70,120 L 50,220 M 330,120 L 350,220
      M 90,140 L 70,220 M 310,140 L 330,220
      M 110,160 L 90,220 M 290,160 L 310,220
    `,
    back: `
      M 70,120 L 50,220 M 330,120 L 350,220
      M 90,140 L 70,220 M 310,140 L 330,220
      M 110,160 L 90,220 M 290,160 L 310,220
    `,
    left: `
      M 80,120 L 60,220
      M 100,140 L 80,220
      M 120,160 L 100,220
    `,
    right: `
      M 320,120 L 340,220
      M 300,140 L 320,220
      M 280,160 L 300,220
    `
  };

  useEffect(() => {
    const handleMouseUp = () => {
      transformRef.current = {
        ...transformRef.current,
        isDragging: false,
        isScaling: false,
        isRotating: false,
        activeHandle: null
      };
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const getMousePosition = (event: React.MouseEvent) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };

    const CTM = svg.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };

    return {
      x: (event.clientX - CTM.e) / CTM.a,
      y: (event.clientY - CTM.f) / CTM.d,
    };
  };

  const constrainToBox = (x: number, y: number, design: Design) => {
    const constraints = printSizeConstraints[printSize];
    const centerX = 200;
    const centerY = 225;
    
    // Calculate design bounds considering rotation and scale
    const designWidth = transformRef.current.designWidth * design.scale;
    const designHeight = transformRef.current.designHeight * design.scale;
    const halfWidth = designWidth / 2;
    const halfHeight = designHeight / 2;

    // Calculate print area bounds
    const boxLeft = centerX - constraints.width / 2 + halfWidth;
    const boxRight = centerX + constraints.width / 2 - halfWidth;
    const boxTop = centerY - constraints.height / 2 + halfHeight;
    const boxBottom = centerY + constraints.height / 2 - halfHeight;

    return {
      x: Math.max(boxLeft, Math.min(boxRight, x)),
      y: Math.max(boxTop, Math.min(boxBottom, y))
    };
  };

  const handleMouseDown = (e: React.MouseEvent, design: Design, handle?: string) => {
    e.stopPropagation();
    const { x, y } = getMousePosition(e);
    
    onDesignSelect(design.id);
    
    if (handle) {
      transformRef.current = {
        ...transformRef.current,
        isScaling: true,
        activeHandle: handle,
        startX: x,
        startY: y,
        startScale: design.scale,
        startAngle: design.rotation
      };
    } else {
      transformRef.current = {
        ...transformRef.current,
        isDragging: true,
        startX: x - design.position.x,
        startY: y - design.position.y,
        startAngle: design.rotation,
        startScale: design.scale,
        activeHandle: null
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { x, y } = getMousePosition(e);
    
    if (transformRef.current.isDragging && selectedDesignId) {
      const design = designs.find(d => d.id === selectedDesignId);
      if (!design) return;

      const newX = x - transformRef.current.startX;
      const newY = y - transformRef.current.startY;
      const constrained = constrainToBox(newX, newY, design);

      onDesignUpdate(selectedDesignId, {
        position: constrained,
      });
    } else if (transformRef.current.isScaling && selectedDesignId) {
      const design = designs.find(d => d.id === selectedDesignId);
      if (!design) return;

      const dx = x - design.position.x;
      const dy = y - design.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const originalDistance = Math.sqrt(
        Math.pow(transformRef.current.startX - design.position.x, 2) +
        Math.pow(transformRef.current.startY - design.position.y, 2)
      );

      const constraints = printSizeConstraints[printSize];
      const maxScale = Math.min(
        constraints.width / transformRef.current.designWidth,
        constraints.height / transformRef.current.designHeight
      );

      const scaleFactor = distance / originalDistance;
      const newScale = Math.max(0.5, Math.min(maxScale, transformRef.current.startScale * scaleFactor));

      if (transformRef.current.activeHandle?.includes('corner')) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const startAngle = Math.atan2(
          transformRef.current.startY - design.position.y,
          transformRef.current.startX - design.position.x
        ) * (180 / Math.PI);
        const rotationDelta = angle - startAngle;
        const newRotation = (transformRef.current.startAngle + rotationDelta) % 360;

        onDesignUpdate(selectedDesignId, { scale: newScale, rotation: newRotation });
      } else {
        onDesignUpdate(selectedDesignId, { scale: newScale });
      }
    }
  };

  const handleWheel = (e: React.WheelEvent, design: Design) => {
    e.preventDefault();
    if (design.id !== selectedDesignId) return;

    const constraints = printSizeConstraints[printSize];
    const maxScale = Math.min(
      constraints.width / transformRef.current.designWidth,
      constraints.height / transformRef.current.designHeight
    );

    const scaleFactor = e.deltaY > 0 ? 0.95 : 1.05;
    const newScale = Math.max(0.5, Math.min(maxScale, design.scale * scaleFactor));

    onDesignUpdate(design.id, { scale: newScale });
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 500"
      className="w-full h-full"
      onMouseMove={handleMouseMove}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
      </defs>

      {/* T-Shirt Base */}
      <path
        d={tshirtPaths[currentView]}
        fill={colorMap[color]}
        stroke="#333"
        strokeWidth="2"
        filter="url(#shadow)"
      />
      
      {/* Collar */}
      <path
        d={collarPaths[currentView]}
        fill="none"
        stroke="#333"
        strokeWidth="1.5"
      />

      {/* Sleeve Details */}
      <path
        d={sleevePaths[currentView]}
        fill="none"
        stroke="#333"
        strokeWidth="1"
        strokeOpacity="0.5"
      />

      {/* Print Size Box */}
      <rect
        x={200 - printSizeConstraints[printSize].width / 2}
        y={225 - printSizeConstraints[printSize].height / 2}
        width={printSizeConstraints[printSize].width}
        height={printSizeConstraints[printSize].height}
        fill="none"
        stroke="#666"
        strokeWidth="1"
        strokeDasharray="4"
      />

      {/* Designs */}
      {designs.map((design) => (
        <g
          key={design.id}
          transform={`
            translate(${design.position.x},${design.position.y})
            rotate(${design.rotation})
            scale(${design.scale})
          `}
          onMouseDown={(e) => handleMouseDown(e, design)}
          onWheel={(e) => handleWheel(e, design)}
          style={{ cursor: 'move' }}
        >
          <image
            href={design.url}
            x={-50}
            y={-50}
            width={100}
            height={100}
            preserveAspectRatio="xMidYMid meet"
          />
          {selectedDesignId === design.id && (
            <>
              {/* Selection border */}
              <rect
                x={-52}
                y={-52}
                width={104}
                height={104}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="4"
              />
              
              {/* Corner handles */}
              {[
                { x: -52, y: -52, cursor: 'nw-resize', id: 'corner-nw' },
                { x: 52, y: -52, cursor: 'ne-resize', id: 'corner-ne' },
                { x: 52, y: 52, cursor: 'se-resize', id: 'corner-se' },
                { x: -52, y: 52, cursor: 'sw-resize', id: 'corner-sw' }
              ].map((handle) => (
                <g key={handle.id}>
                  <rect
                    x={handle.x - 4}
                    y={handle.y - 4}
                    width={8}
                    height={8}
                    fill="white"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    style={{ cursor: handle.cursor }}
                    onMouseDown={(e) => handleMouseDown(e, design, handle.id)}
                  />
                </g>
              ))}
              
              {/* Edge handles */}
              {[
                { x: 0, y: -52, cursor: 'n-resize', id: 'edge-n' },
                { x: 52, y: 0, cursor: 'e-resize', id: 'edge-e' },
                { x: 0, y: 52, cursor: 's-resize', id: 'edge-s' },
                { x: -52, y: 0, cursor: 'w-resize', id: 'edge-w' }
              ].map((handle) => (
                <g key={handle.id}>
                  <rect
                    x={handle.x - 4}
                    y={handle.y - 4}
                    width={8}
                    height={8}
                    fill="white"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    style={{ cursor: handle.cursor }}
                    onMouseDown={(e) => handleMouseDown(e, design, handle.id)}
                  />
                </g>
              ))}
            </>
          )}
        </g>
      ))}
    </svg>
  );
};

export default TShirtMockup;