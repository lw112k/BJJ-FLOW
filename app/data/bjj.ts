export type PositionCategory = 'Neutral' | 'Top' | 'Bottom' | 'Dominant';
export type ActionType = 'Sweep' | 'Pass' | 'Advance' | 'Escape' | 'Takedown' | 'Pull';
export type SubType = 'Choke' | 'Joint Lock' | 'Leg Lock';

export interface Submission {
  id: string;
  name: string;
  type: SubType;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Transition {
  targetId: string;
  actionName: string;
  type: ActionType;
}

export interface Position {
  id: string;
  name: string;
  category: PositionCategory;
  description: string;
  transitions: Transition[];
  submissions: Submission[];
}

export const bjjGraph: Record<string, Position> = {
  standing: {
    id: 'standing',
    name: 'Standing',
    category: 'Neutral',
    description: 'The starting position of every match. Both practitioners are on their feet.',
    transitions: [
      { targetId: 'side_control_top', actionName: 'Takedown (e.g., Double Leg)', type: 'Takedown' },
      { targetId: 'closed_guard_top', actionName: 'Takedown into Guard', type: 'Takedown' },
      { targetId: 'closed_guard_bottom', actionName: 'Guard Pull', type: 'Pull' },
      { targetId: 'half_guard_bottom', actionName: 'Half Guard Pull', type: 'Pull' },
    ],
    submissions: [
      { id: 'standing_guillotine', name: 'Standing Guillotine', type: 'Choke', difficulty: 'Intermediate' },
      { id: 'flying_armbar', name: 'Flying Armbar', type: 'Joint Lock', difficulty: 'Advanced' },
      { id: 'flying_triangle', name: 'Flying Triangle', type: 'Choke', difficulty: 'Advanced' },
    ]
  },
  closed_guard_bottom: {
    id: 'closed_guard_bottom',
    name: 'Closed Guard (Bottom)',
    category: 'Bottom',
    description: 'Lying on your back with your legs wrapped around your opponent\'s torso, ankles crossed.',
    transitions: [
      { targetId: 'mount_top', actionName: 'Scissor Sweep / Hip Bump Sweep', type: 'Sweep' },
      { targetId: 'back_control', actionName: 'Arm Drag to Back', type: 'Advance' },
      { targetId: 'open_guard_bottom', actionName: 'Open Guard Transition', type: 'Advance' },
    ],
    submissions: [
      { id: 'cg_triangle', name: 'Triangle Choke', type: 'Choke', difficulty: 'Beginner' },
      { id: 'cg_armbar', name: 'Armbar', type: 'Joint Lock', difficulty: 'Beginner' },
      { id: 'cg_kimura', name: 'Kimura', type: 'Joint Lock', difficulty: 'Beginner' },
      { id: 'cg_guillotine', name: 'Guillotine Choke', type: 'Choke', difficulty: 'Beginner' },
      { id: 'cg_cross_collar', name: 'Cross Collar Choke', type: 'Choke', difficulty: 'Beginner' },
      { id: 'cg_omoplata', name: 'Omoplata', type: 'Joint Lock', difficulty: 'Intermediate' },
    ]
  },
  closed_guard_top: {
    id: 'closed_guard_top',
    name: 'Closed Guard (Top)',
    category: 'Top',
    description: 'Kneeling inside your opponent\'s closed legs. You must break their guard to advance.',
    transitions: [
      { targetId: 'side_control_top', actionName: 'Guard Pass (e.g., Knee Slice, Toreando)', type: 'Pass' },
      { targetId: 'half_guard_top', actionName: 'Force Half Guard', type: 'Pass' },
      { targetId: 'standing', actionName: 'Stand Up to Pass', type: 'Advance' },
    ],
    submissions: [
      { id: 'cgt_ezekiel', name: 'Ezekiel Choke', type: 'Choke', difficulty: 'Intermediate' },
      { id: 'cgt_americana', name: 'Americana (Rare)', type: 'Joint Lock', difficulty: 'Advanced' },
    ]
  },
  side_control_top: {
    id: 'side_control_top',
    name: 'Side Control (Top)',
    category: 'Dominant',
    description: 'Pinning your opponent perpendicular to their body, chest-to-chest.',
    transitions: [
      { targetId: 'mount_top', actionName: 'Mount Transition', type: 'Advance' },
      { targetId: 'knee_on_belly_top', actionName: 'Knee on Belly', type: 'Advance' },
      { targetId: 'back_control', actionName: 'Take the Back (if they turn away)', type: 'Advance' },
      { targetId: 'north_south_top', actionName: 'North-South Transition', type: 'Advance' },
    ],
    submissions: [
      { id: 'sct_kimura', name: 'Kimura', type: 'Joint Lock', difficulty: 'Beginner' },
      { id: 'sct_americana', name: 'Americana', type: 'Joint Lock', difficulty: 'Beginner' },
      { id: 'sct_armbar', name: 'Far-side Armbar', type: 'Joint Lock', difficulty: 'Intermediate' },
      { id: 'sct_paper_cutter', name: 'Paper Cutter Choke', type: 'Choke', difficulty: 'Intermediate' },
      { id: 'sct_baseball_bat', name: 'Baseball Bat Choke', type: 'Choke', difficulty: 'Intermediate' },
      { id: 'sct_arm_triangle', name: 'Arm Triangle Choke', type: 'Choke', difficulty: 'Intermediate' },
    ]
  },
  side_control_bottom: {
    id: 'side_control_bottom',
    name: 'Side Control (Bottom)',
    category: 'Bottom',
    description: 'Pinned underneath your opponent who is perpendicular to you.',
    transitions: [
      { targetId: 'closed_guard_bottom', actionName: 'Guard Recovery (Shrimp)', type: 'Escape' },
      { targetId: 'half_guard_bottom', actionName: 'Catch Half Guard', type: 'Escape' },
      { targetId: 'turtle_bottom', actionName: 'Turn to Turtle', type: 'Escape' },
    ],
    submissions: [
      { id: 'scb_baseball_bat', name: 'Baseball Bat Choke (Sneaky)', type: 'Choke', difficulty: 'Advanced' },
      { id: 'scb_buggy_choke', name: 'Buggy Choke', type: 'Choke', difficulty: 'Advanced' },
    ]
  },
  mount_top: {
    id: 'mount_top',
    name: 'Mount (Top)',
    category: 'Dominant',
    description: 'Sitting astride your opponent\'s torso, with your knees on the floor on either side of them.',
    transitions: [
      { targetId: 'back_control', actionName: 'Take the Back (if they roll)', type: 'Advance' },
      { targetId: 'side_control_top', actionName: 'Dismount to Side Control', type: 'Advance' },
    ],
    submissions: [
      { id: 'mt_armbar', name: 'Armbar', type: 'Joint Lock', difficulty: 'Beginner' },
      { id: 'mt_americana', name: 'Americana', type: 'Joint Lock', difficulty: 'Beginner' },
      { id: 'mt_cross_collar', name: 'Cross Collar Choke', type: 'Choke', difficulty: 'Beginner' },
      { id: 'mt_ezekiel', name: 'Ezekiel Choke', type: 'Choke', difficulty: 'Beginner' },
      { id: 'mt_triangle', name: 'Mounted Triangle', type: 'Choke', difficulty: 'Intermediate' },
      { id: 'mt_arm_triangle', name: 'Arm Triangle Choke', type: 'Choke', difficulty: 'Intermediate' },
    ]
  },
  mount_bottom: {
    id: 'mount_bottom',
    name: 'Mount (Bottom)',
    category: 'Bottom',
    description: 'Trapped underneath your opponent who is sitting astride your torso.',
    transitions: [
      { targetId: 'closed_guard_bottom', actionName: 'Upa (Bridge and Roll) Escape', type: 'Escape' },
      { targetId: 'half_guard_bottom', actionName: 'Elbow Escape (Shrimp to Half Guard)', type: 'Escape' },
    ],
    submissions: []
  },
  back_control: {
    id: 'back_control',
    name: 'Back Control',
    category: 'Dominant',
    description: 'Controlling your opponent from behind, usually with your legs hooked around their waist (hooks in) and a seatbelt grip.',
    transitions: [
      { targetId: 'mount_top', actionName: 'Transition to Mount', type: 'Advance' },
    ],
    submissions: [
      { id: 'bc_rnc', name: 'Rear Naked Choke (RNC)', type: 'Choke', difficulty: 'Beginner' },
      { id: 'bc_bow_arrow', name: 'Bow and Arrow Choke', type: 'Choke', difficulty: 'Intermediate' },
      { id: 'bc_armbar', name: 'Armbar from the Back', type: 'Joint Lock', difficulty: 'Intermediate' },
      { id: 'bc_ezekiel', name: 'Ezekiel Choke from Back', type: 'Choke', difficulty: 'Intermediate' },
      { id: 'bc_triangle', name: 'Rear Triangle', type: 'Choke', difficulty: 'Advanced' },
    ]
  },
  half_guard_bottom: {
    id: 'half_guard_bottom',
    name: 'Half Guard (Bottom)',
    category: 'Bottom',
    description: 'Lying on your back or side, entangling one of your opponent\'s legs with both of your legs.',
    transitions: [
      { targetId: 'closed_guard_bottom', actionName: 'Recover Full Guard', type: 'Escape' },
      { targetId: 'side_control_top', actionName: 'Sweep to Top (e.g., Old School Sweep)', type: 'Sweep' },
      { targetId: 'back_control', actionName: 'Take the Back (e.g., from Deep Half or Underhook)', type: 'Advance' },
    ],
    submissions: [
      { id: 'hgb_kimura', name: 'Kimura', type: 'Joint Lock', difficulty: 'Intermediate' },
      { id: 'hgb_guillotine', name: 'Guillotine Choke', type: 'Choke', difficulty: 'Intermediate' },
      { id: 'hgb_kneebar', name: 'Kneebar', type: 'Leg Lock', difficulty: 'Advanced' },
    ]
  },
  half_guard_top: {
    id: 'half_guard_top',
    name: 'Half Guard (Top)',
    category: 'Top',
    description: 'On top, but one of your legs is trapped by your opponent\'s legs.',
    transitions: [
      { targetId: 'side_control_top', actionName: 'Pass Half Guard (e.g., Knee Slice)', type: 'Pass' },
      { targetId: 'mount_top', actionName: 'Mount Transition', type: 'Pass' },
    ],
    submissions: [
      { id: 'hgt_kimura', name: 'Kimura', type: 'Joint Lock', difficulty: 'Intermediate' },
      { id: 'hgt_americana', name: 'Americana', type: 'Joint Lock', difficulty: 'Intermediate' },
      { id: 'hgt_arm_triangle', name: 'Arm Triangle Choke', type: 'Choke', difficulty: 'Intermediate' },
      { id: 'hgt_darce', name: 'D\'Arce Choke', type: 'Choke', difficulty: 'Advanced' },
    ]
  },
  open_guard_bottom: {
    id: 'open_guard_bottom',
    name: 'Open Guard (Bottom)',
    category: 'Bottom',
    description: 'On your back with legs open, using feet and grips to control the opponent (e.g., Spider, De La Riva, Lasso).',
    transitions: [
      { targetId: 'closed_guard_bottom', actionName: 'Close the Guard', type: 'Advance' },
      { targetId: 'side_control_top', actionName: 'Sweep to Top', type: 'Sweep' },
      { targetId: 'mount_top', actionName: 'Sweep to Mount', type: 'Sweep' },
      { targetId: 'back_control', actionName: 'Take the Back (e.g., Berimbolo)', type: 'Advance' },
    ],
    submissions: [
      { id: 'ogb_triangle', name: 'Triangle Choke', type: 'Choke', difficulty: 'Intermediate' },
      { id: 'ogb_omoplata', name: 'Omoplata', type: 'Joint Lock', difficulty: 'Intermediate' },
      { id: 'ogb_armbar', name: 'Armbar', type: 'Joint Lock', difficulty: 'Intermediate' },
      { id: 'ogb_straight_ankle', name: 'Straight Ankle Lock', type: 'Leg Lock', difficulty: 'Beginner' },
      { id: 'ogb_heel_hook', name: 'Heel Hook', type: 'Leg Lock', difficulty: 'Advanced' },
    ]
  },
  open_guard_top: {
    id: 'open_guard_top',
    name: 'Open Guard (Top)',
    category: 'Top',
    description: 'Standing or kneeling over an opponent who is playing open guard.',
    transitions: [
      { targetId: 'side_control_top', actionName: 'Pass Guard (e.g., Toreando, Leg Drag)', type: 'Pass' },
      { targetId: 'knee_on_belly_top', actionName: 'Pass to Knee on Belly', type: 'Pass' },
    ],
    submissions: [
      { id: 'ogt_straight_ankle', name: 'Straight Ankle Lock', type: 'Leg Lock', difficulty: 'Intermediate' },
      { id: 'ogt_kneebar', name: 'Kneebar', type: 'Leg Lock', difficulty: 'Advanced' },
      { id: 'ogt_toe_hold', name: 'Toe Hold', type: 'Leg Lock', difficulty: 'Advanced' },
    ]
  },
  knee_on_belly_top: {
    id: 'knee_on_belly_top',
    name: 'Knee on Belly (Top)',
    category: 'Dominant',
    description: 'Pinning the opponent by placing your shin/knee across their stomach/belt line.',
    transitions: [
      { targetId: 'mount_top', actionName: 'Transition to Mount', type: 'Advance' },
      { targetId: 'side_control_top', actionName: 'Drop to Side Control', type: 'Advance' },
      { targetId: 'back_control', actionName: 'Take the Back (if they turn away)', type: 'Advance' },
    ],
    submissions: [
      { id: 'kob_armbar', name: 'Far-side Armbar', type: 'Joint Lock', difficulty: 'Intermediate' },
      { id: 'kob_cross_collar', name: 'Cross Collar Choke', type: 'Choke', difficulty: 'Intermediate' },
      { id: 'kob_baseball_bat', name: 'Baseball Bat Choke', type: 'Choke', difficulty: 'Intermediate' },
    ]
  },
  turtle_bottom: {
    id: 'turtle_bottom',
    name: 'Turtle (Bottom)',
    category: 'Bottom',
    description: 'Curled up on your knees and elbows to protect your back and neck.',
    transitions: [
      { targetId: 'closed_guard_bottom', actionName: 'Roll to Guard', type: 'Escape' },
      { targetId: 'side_control_top', actionName: 'Sit-out / Reversal', type: 'Sweep' },
      { targetId: 'standing', actionName: 'Stand Up', type: 'Escape' },
    ],
    submissions: [
      { id: 'tb_kneebar', name: 'Rolling Kneebar (Victor Roll)', type: 'Leg Lock', difficulty: 'Advanced' },
      { id: 'tb_kimura', name: 'Kimura (from bottom)', type: 'Joint Lock', difficulty: 'Advanced' },
    ]
  },
  turtle_top: {
    id: 'turtle_top',
    name: 'Turtle (Top)',
    category: 'Top',
    description: 'Attacking an opponent who is in the turtle position.',
    transitions: [
      { targetId: 'back_control', actionName: 'Insert Hooks (Take the Back)', type: 'Advance' },
      { targetId: 'side_control_top', actionName: 'Breakdown to Side Control', type: 'Advance' },
    ],
    submissions: [
      { id: 'tt_clock_choke', name: 'Clock Choke', type: 'Choke', difficulty: 'Intermediate' },
      { id: 'tt_crucifix', name: 'Crucifix Choke/Armbar', type: 'Choke', difficulty: 'Advanced' },
      { id: 'tt_anaconda', name: 'Anaconda Choke', type: 'Choke', difficulty: 'Advanced' },
      { id: 'tt_darce', name: 'D\'Arce Choke', type: 'Choke', difficulty: 'Advanced' },
      { id: 'tt_guillotine', name: 'Guillotine Choke', type: 'Choke', difficulty: 'Intermediate' },
    ]
  },
  north_south_top: {
    id: 'north_south_top',
    name: 'North-South (Top)',
    category: 'Dominant',
    description: 'Pinning the opponent from above their head, facing their feet.',
    transitions: [
      { targetId: 'side_control_top', actionName: 'Transition to Side Control', type: 'Advance' },
      { targetId: 'back_control', actionName: 'Take the Back (if they roll)', type: 'Advance' },
    ],
    submissions: [
      { id: 'ns_choke', name: 'North-South Choke', type: 'Choke', difficulty: 'Intermediate' },
      { id: 'ns_kimura', name: 'Kimura', type: 'Joint Lock', difficulty: 'Intermediate' },
    ]
  }
};
