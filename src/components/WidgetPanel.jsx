import React from 'react';

const WidgetPanel = ({ color, icon, value, label }) => {
  return (
    <div className="col-md-4">
      <div className={`card text-white bg-${color} shadow`}>
        <div className="card-body d-flex align-items-center">
          <i className={`${icon} fs-2 me-3`}></i>
          <div>
            <h5 className="mb-0">{value}</h5>
            <small>{label}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetPanel;
