import React from 'react';

export default function PageHeader({ title, action }) {
  return (
    <div className="page-title">
      <h2>{title}</h2>
      <div>{action}</div>
    </div>
  );
}
