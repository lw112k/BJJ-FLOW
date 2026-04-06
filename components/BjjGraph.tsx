'use client';

import React, { useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType,
  Position as FlowPosition
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { bjjGraph } from '../app/data/bjj';

const nodeWidth = 180;
const nodeHeight = 60;

const initialPositions: Record<string, { x: number, y: number }> = {
  standing: { x: 400, y: 50 },
  closed_guard_top: { x: 200, y: 200 },
  closed_guard_bottom: { x: 600, y: 200 },
  open_guard_top: { x: 0, y: 200 },
  open_guard_bottom: { x: 800, y: 200 },
  half_guard_top: { x: 200, y: 350 },
  half_guard_bottom: { x: 600, y: 350 },
  side_control_top: { x: 200, y: 500 },
  side_control_bottom: { x: 600, y: 500 },
  knee_on_belly_top: { x: 0, y: 500 },
  mount_top: { x: 200, y: 650 },
  mount_bottom: { x: 600, y: 650 },
  back_control: { x: 400, y: 800 },
  turtle_top: { x: 200, y: 950 },
  turtle_bottom: { x: 600, y: 950 },
  north_south_top: { x: 0, y: 650 },
};

interface BjjGraphProps {
  onNodeSelect: (positionId: string) => void;
  selectedNodeId: string | null;
  highlightedNodes: string[];
  highlightedEdges: string[];
  isHighlightMode: boolean;
}

export default function BjjGraph({ onNodeSelect, selectedNodeId, highlightedNodes, highlightedEdges, isHighlightMode }: BjjGraphProps) {
  const initialNodes: Node[] = useMemo(() => {
    return Object.values(bjjGraph).map((pos) => {
      let bgColor = '#ffffff';
      if (pos.category === 'Dominant') bgColor = '#dcfce7';
      if (pos.category === 'Top') bgColor = '#e0f2fe';
      if (pos.category === 'Bottom') bgColor = '#fee2e2';
      if (pos.category === 'Neutral') bgColor = '#f3f4f6';

      return {
        id: pos.id,
        position: initialPositions[pos.id] || { x: 0, y: 0 },
        data: { label: pos.name },
        style: {
          background: bgColor,
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          padding: '10px',
          fontWeight: 'normal',
          boxShadow: 'none',
          width: nodeWidth,
          textAlign: 'center',
          transition: 'all 0.3s ease',
        },
        sourcePosition: FlowPosition.Bottom,
        targetPosition: FlowPosition.Top,
      };
    });
  }, []);

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    Object.values(bjjGraph).forEach((pos) => {
      pos.transitions.forEach((trans, idx) => {
        edges.push({
          id: `e-${pos.id}-${trans.targetId}-${idx}`,
          source: pos.id,
          target: trans.targetId,
          label: trans.actionName,
          animated: true,
          style: { stroke: '#94a3b8', strokeWidth: 2, transition: 'all 0.3s ease' },
          labelStyle: { fill: '#475569', fontSize: 10, fontWeight: 500 },
          labelBgStyle: { fill: '#f8fafc', fillOpacity: 0.8 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#94a3b8',
          },
        });
      });
    });
    return edges;
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        const isSelected = node.id === selectedNodeId;
        const isHighlighted = highlightedNodes.includes(node.id);
        const dimNode = isHighlightMode && !isHighlighted && !isSelected;

        return {
          ...node,
          style: {
            ...node.style,
            border: isSelected ? '2px solid #0f172a' : (isHighlighted ? '2px solid #6366f1' : '1px solid #cbd5e1'),
            fontWeight: isSelected || isHighlighted ? 'bold' : 'normal',
            boxShadow: isSelected ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : (isHighlighted ? '0 0 15px rgba(99, 102, 241, 0.4)' : 'none'),
            opacity: dimNode ? 0.3 : 1,
          },
        };
      })
    );
  }, [selectedNodeId, highlightedNodes, isHighlightMode, setNodes]);

  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        const isHighlighted = highlightedEdges.includes(edge.id);
        const dimEdge = isHighlightMode && !isHighlighted;

        return {
          ...edge,
          animated: isHighlighted || !isHighlightMode,
          style: {
            ...edge.style,
            stroke: isHighlighted ? '#6366f1' : '#94a3b8',
            strokeWidth: isHighlighted ? 3 : 2,
            opacity: dimEdge ? 0.15 : 1,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isHighlighted ? '#6366f1' : '#94a3b8',
          },
          zIndex: isHighlighted ? 10 : 0,
        };
      })
    );
  }, [highlightedEdges, isHighlightMode, setEdges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    onNodeSelect(node.id);
  }, [onNodeSelect]);

  return (
    <div className="w-full h-full bg-slate-50 rounded-bl-2xl md:rounded-bl-none md:rounded-l-2xl overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-right"
      >
        <Controls />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
        <Background color="#cbd5e1" gap={16} />
      </ReactFlow>
    </div>
  );
}
