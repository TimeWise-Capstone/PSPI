import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import MainDashboard from './pages/MainDashboard.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TaskPriority from './pages/TaskPriority.jsx';
import AcademicIntake from './pages/AcademicIntake.jsx';
import ResourceRequest from './pages/ResourceRequest.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainDashboard />} />
        <Route path="courses" element={<AcademicIntake />} />
        <Route path="study-plan" element={<TaskPriority />} />
        <Route path="analytics" element={<Dashboard />} />
        <Route path="resources" element={<ResourceRequest />} />
        <Route path="*" element={<MainDashboard />} />
      </Route>
    </Routes>
  );
}
