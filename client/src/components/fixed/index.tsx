import React from 'react';
import '../../preview.css';

// --- FIXED COMPONENT LIBRARY ---

export const Button = ({ children, variant = 'primary', onClick, ...props }: any) => (
  <button className={`fc-button fc-button-${variant}`} onClick={onClick} {...props}>
    {children}
  </button>
);

export const Card = ({ title, children, ...props }: any) => (
  <div className="fc-card" {...props}>
    {title && (
      <div className="fc-card-header">
        <h3 className="fc-card-title">{title}</h3>
      </div>
    )}
    <div className="fc-card-content">{children}</div>
  </div>
);

export const Input = ({ label, type = 'text', placeholder, ...props }: any) => (
  <div className="fc-input-wrapper" {...props}>
    {label && <label className="fc-label">{label}</label>}
    <input type={type} className="fc-input" placeholder={placeholder} />
  </div>
);

export const Table = ({ headers = [], rows = [], ...props }: any) => (
  <div className="fc-table-wrapper" {...props}>
    <table className="fc-table">
      <thead>
        <tr>
          {headers.map((h: string, i: number) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row: string[], i: number) => (
          <tr key={i}>
            {row.map((cell: string, j: number) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const Modal = ({ isOpen, title, children, onClose, ...props }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fc-modal-overlay" onClick={onClose}>
      <div className="fc-modal" onClick={(e) => e.stopPropagation()} {...props}>
        <div className="fc-card-header" style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="fc-card-title">{title}</h3>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
          </div>
        </div>
        <div style={{ padding: '1.5rem' }}>{children}</div>
      </div>
    </div>
  );
};

export const Sidebar = ({ items = [], ...props }: any) => (
  <div className="fc-sidebar" {...props}>
    {items.map((item: any, i: number) => (
      <a key={i} href="#" className={`fc-sidebar-item ${item.active ? 'fc-sidebar-item-active' : ''}`}>
        {item.label}
      </a>
    ))}
  </div>
);

export const Navbar = ({ brand = 'App', links = [], ...props }: any) => (
  <nav className="fc-navbar" {...props}>
    <div className="fc-navbar-brand">{brand}</div>
    <div style={{ display: 'flex', gap: '1rem' }}>
      {links.map((link: string, i: number) => (
        <a key={i} href="#" style={{ textDecoration: 'none', color: '#4b5563', fontSize: '0.875rem' }}>
          {link}
        </a>
      ))}
    </div>
  </nav>
);

export const Chart = ({ type = 'bar', ...props }: any) => (
  <div className="fc-chart-placeholder" {...props}>
    [Mock {type} Chart Component]
  </div>
);

export const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  Button,
  Card,
  Input,
  Table,
  Modal,
  Sidebar,
  Navbar,
  Chart,
};
