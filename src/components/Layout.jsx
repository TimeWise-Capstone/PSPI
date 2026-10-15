import { NavLink, Outlet } from 'react-router-dom';
import { navItems, team } from '../pages.js';

export default function Layout() {
  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <span className="clock" aria-hidden="true" />
          <span>TimeWise</span>
        </NavLink>
        <div className="profile">Post-Secondary Student &#9662;</div>
      </header>

      <aside className="sidebar">
        <div className="nav-title">Navigation</div>
        <nav className="nav" aria-label="Main">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="team-note">{team.join(' · ')}</div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
