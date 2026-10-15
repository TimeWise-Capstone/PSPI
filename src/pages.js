// Sidebar navigation (matches the "Main Dashboard / Navigation" wireframe).
// Each non-dashboard entry maps to a page owned by one team member.
export const navItems = [
  { path: '/', label: 'Dashboard', end: true },
  { path: '/courses', label: 'Courses', area: 'FA1', owner: 'Marcel' },
  { path: '/study-plan', label: 'Study Plan', area: 'FA2', owner: 'Nawaf' },
  { path: '/analytics', label: 'Analytics', area: 'FA3', owner: 'Rowan' },
  { path: '/resources', label: 'Resources', area: 'FA4', owner: 'Zain' },
];

export const team = ['Rowan', 'Marcel', 'Nawaf', 'Zain'];
