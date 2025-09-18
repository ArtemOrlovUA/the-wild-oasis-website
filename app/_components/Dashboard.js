'use client';

import DashboardFilter from './DashboardFilter';
import DashboardLayout from './DashboardLayout';
import Row from './Row';

function Dashboard() {
  return (
    <div className="w-full">
      <Row type="hor">
        <DashboardFilter />
      </Row>

      <div className="mt-6">
        <DashboardLayout />
      </div>
    </div>
  );
}

export default Dashboard;
