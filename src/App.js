import DashBorad from "./pages/dashBoard/DashBorad";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/dashboard" exact component={DashBorad} />
        </Switch>
      </Router>
      {/* <Login /> */}
      {/* <SignUp /> */}
      {/* <DashBorad /> */}
    </div>
  );
}

export default App;
