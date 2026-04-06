'use client';

import React from 'react';
import { bjjGraph, Position } from '../app/data/bjj';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ShieldAlert, ShieldCheck, Swords, ArrowRight, Activity, Zap } from 'lucide-react';

interface PositionDetailsProps {
  positionId: string | null;
  onTransitionClick: (targetId: string) => void;
}

export default function PositionDetails({ positionId, onTransitionClick }: PositionDetailsProps) {
  if (!positionId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
        <Swords className="w-16 h-16 mb-4 opacity-20" />
        <h3 className="text-xl font-medium text-slate-600 mb-2">Select a Position</h3>
        <p>Click on a node in the graph to view available transitions and submissions.</p>
      </div>
    );
  }

  const position = bjjGraph[positionId];

  if (!position) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Dominant': return <ShieldCheck className="w-5 h-5 text-green-600" />;
      case 'Bottom': return <ShieldAlert className="w-5 h-5 text-red-600" />;
      case 'Top': return <Shield className="w-5 h-5 text-sky-600" />;
      default: return <Shield className="w-5 h-5 text-slate-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Dominant': return 'bg-green-100 text-green-800 border-green-200';
      case 'Bottom': return 'bg-red-100 text-red-800 border-red-200';
      case 'Top': return 'bg-sky-100 text-sky-800 border-sky-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-700';
      case 'Intermediate': return 'bg-amber-100 text-amber-700';
      case 'Advanced': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={position.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="h-full flex flex-col overflow-y-auto p-6"
      >
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            {getCategoryIcon(position.category)}
            <h2 className="text-2xl font-bold text-slate-900">{position.name}</h2>
          </div>
          <div className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border mb-4 ${getCategoryColor(position.category)}`}>
            {position.category} Position
          </div>
          <p className="text-slate-600 leading-relaxed">
            {position.description}
          </p>
        </div>

        <div className="space-y-8">
          {/* Transitions */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              Transitions
            </h3>
            {position.transitions.length > 0 ? (
              <div className="grid gap-3">
                {position.transitions.map((trans, idx) => (
                  <button
                    key={idx}
                    onClick={() => onTransitionClick(trans.targetId)}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm transition-all text-left group"
                  >
                    <div>
                      <div className="font-medium text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {trans.actionName}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Type: {trans.type}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-indigo-500">
                      <span className="text-sm font-medium">{bjjGraph[trans.targetId]?.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic text-sm">No standard transitions defined.</p>
            )}
          </div>

          {/* Submissions */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Submissions
            </h3>
            {position.submissions.length > 0 ? (
              <div className="grid gap-3">
                {position.submissions.map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-amber-100 bg-gradient-to-r from-amber-50/50 to-white"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-medium text-slate-800">{sub.name}</div>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${getDifficultyColor(sub.difficulty)}`}>
                        {sub.difficulty}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {sub.type}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic text-sm">No direct submissions from this position.</p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
