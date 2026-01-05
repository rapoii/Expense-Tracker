import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Clock, PieChart, Settings, Plus } from 'lucide-react';
import './BottomNav.css';

const BottomNav = ({ onAddClick }) => {
    const iconSize = 24;

    return (
        <nav className="bottom-nav">
            <NavLink
                to="/"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                end
            >
                <div className="nav-icon"><Home size={iconSize} /></div>
                <span>Home</span>
            </NavLink>

            <NavLink
                to="/history"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
                <div className="nav-icon"><Clock size={iconSize} /></div>
                <span>History</span>
            </NavLink>

            <div className="nav-fab-wrapper">
                <button className="nav-fab" onClick={onAddClick}>
                    <Plus size={32} />
                </button>
            </div>

            <NavLink
                to="/reports"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
                <div className="nav-icon"><PieChart size={iconSize} /></div>
                <span>Reports</span>
            </NavLink>

            <NavLink
                to="/settings"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
                <div className="nav-icon"><Settings size={iconSize} /></div>
                <span>Settings</span>
            </NavLink>
        </nav>
    );
};

export default BottomNav;
