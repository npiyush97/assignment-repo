import "./App.css";
import Feed from "./Components/Feed";
import Loginform from "./Components/LoginForm";
import Registerform from "./Components/RegisterForm";
import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "./Components/UserLayout";
import Testpage from "./Components/Postwidgetmodal";
import MainDashboard from "./Components/MainDas";
import AuthRoute from "./Components/Auth";
import AddUsername from "./Components/AddUsername";

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route element={<MainDashboard />} path="/dashboard" />
      </Route>
      <Route element={<AddUsername/>} path="/addusername"/>
      <Route element={<Navigate to="/dashboard" />} path="/*" />
      <Route element={<Testpage />} path="/testpage" />
      <Route element={<Feed />} path="/newsfeed" />
      <Route element={<Registerform />} path="/register" />
      <Route element={<Loginform />} path="/login" />
      {/* <Route element={<UserLayout />} path="/user" /> */}
    </Routes>
  );
}

export default App;
