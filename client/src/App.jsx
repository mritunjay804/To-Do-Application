import { Route, Routes } from "react-router-dom";
import { Login } from "./component/login";
import { Register } from "./component/register";
import { Home } from "./component/home";
import { UserDashboard } from "./component/user_dashboard";
import { Dashboard } from "./pages/dashboard";
import { AddTask } from "./pages/add-task";
import { TotalTask } from "./pages/total-tasks";
import { PendingTask } from "./pages/pending-task";
import { CompleteAppointment } from "./pages/complete-appointment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userDashboard" element={<UserDashboard />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="add-task" element={<AddTask />} />
        <Route path="total-task" element={<TotalTask />} />
        <Route path="pending-task" element={<PendingTask />} />
        <Route path="complete-appointment" element={<CompleteAppointment />} />
      </Route>
    </Routes>
  );
}

export default App;
