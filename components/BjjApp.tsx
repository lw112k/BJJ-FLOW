'use client';

import React, { useState, useMemo } from 'react';
import BjjGraph from './BjjGraph';
import PositionDetails from './PositionDetails';
import { bjjGraph } from '../app/data/bjj';

export default function BjjApp() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [startPositionId, setStartPositionId] = useState<string>('');
  const [targetSubmission, setTargetSubmission] = useState<string>('');

  const allSubmissions = useMemo(() => {
    return Array.from(
      new Set(
        Object.values(bjjGraph).flatMap(p => p.submissions.map(s => s.name))
      )
    ).sort();
  }, []);

  const allPositions = useMemo(() => {
    return Object.values(bjjGraph)
      .map(p => ({ id: p.id, name: p.name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const highlightData = useMemo(() => {
    if (!startPositionId && !targetSubmission) {
      return { nodes: [], edges: [], isHighlightMode: false };
    }

    let nodes: string[] = [];
    let edges: string[] = [];
    let isHighlightMode = true;

    if (startPositionId && targetSubmission) {
      // Find path from startPositionId to any node containing targetSubmission
      const targetNodes = Object.values(bjjGraph)
        .filter(p => p.submissions.some(s => s.name === targetSubmission))
        .map(p => p.id);

      if (targetNodes.includes(startPositionId)) {
        nodes = [startPositionId];
      } else if (targetNodes.length > 0) {
        const queue = [{ id: startPositionId, path: [startPositionId], edgesPath: [] as string[] }];
        const visited = new Set([startPositionId]);
        let found = false;

        while (queue.length > 0 && !found) {
          const { id, path, edgesPath } = queue.shift()!;
          const node = bjjGraph[id];

          for (let i = 0; i < node.transitions.length; i++) {
            const trans = node.transitions[i];
            const nextId = trans.targetId;
            const edgeId = `e-${id}-${nextId}-${i}`;

            if (!visited.has(nextId)) {
              const newPath = [...path, nextId];
              const newEdges = [...edgesPath, edgeId];

              if (targetNodes.includes(nextId)) {
                nodes = newPath;
                edges = newEdges;
                found = true;
                break;
              }

              visited.add(nextId);
              queue.push({ id: nextId, path: newPath, edgesPath: newEdges });
            }
          }
        }
      }
    } else if (targetSubmission) {
      // Highlight all nodes with the submission
      nodes = Object.values(bjjGraph)
        .filter(p => p.submissions.some(s => s.name === targetSubmission))
        .map(p => p.id);
    } else if (startPositionId) {
      // Highlight just the start position
      nodes = [startPositionId];
    }

    return { nodes, edges, isHighlightMode };
  }, [startPositionId, targetSubmission]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Controls Area */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Start Position</label>
            <select
              value={startPositionId}
              onChange={(e) => setStartPositionId(e.target.value)}
              className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white min-w-[200px]"
            >
              <option value="">Any Position</option>
              {allPositions.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Target Submission</label>
            <select
              value={targetSubmission}
              onChange={(e) => setTargetSubmission(e.target.value)}
              className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white min-w-[200px]"
            >
              <option value="">Any Submission</option>
              {allSubmissions.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        {highlightData.isHighlightMode && highlightData.nodes.length === 0 && startPositionId && targetSubmission && (
          <div className="text-sm text-amber-700 bg-amber-100 px-4 py-2 rounded-md border border-amber-200 font-medium">
            No direct path found from this position to the submission.
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Graph Area */}
        <div className="flex-1 h-[50vh] md:h-full border-b md:border-b-0 md:border-r border-slate-200 relative">
          <BjjGraph
            selectedNodeId={selectedNodeId}
            onNodeSelect={setSelectedNodeId}
            highlightedNodes={highlightData.nodes}
            highlightedEdges={highlightData.edges}
            isHighlightMode={highlightData.isHighlightMode}
          />
        </div>

        {/* Details Area */}
        <div className="w-full md:w-96 h-[50vh] md:h-full bg-white">
          <PositionDetails
            positionId={selectedNodeId}
            onTransitionClick={setSelectedNodeId}
          />
        </div>
      </div>
    </div>
  );
}
