import { createContext, useContext, useEffect } from "react";
import HomeScreen from "./pages/HomeScreen";
import ClientsScreen from "./pages/ClientsScreen";
import CasesScreen from "./pages/CasesScreen";
import FilesScreen from "./pages/FilesScreen";
import SessionsScreen from "./pages/SessionsScreen";
import LoginScreen from "./pages/LoginScreen";
import ClientDetail from "./pages/ClientDetail";
import "./assets/scss/MainScreen.scss";
import TitleBar from "./Components/TitleBar";
import {
  HashRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Sidebar from "./Components/Sidebar2";
import { useSelector } from "react-redux";

const App = () => {
  return (
    <div className="App Main-Container">
      <TitleBar />
      <ProvideAuth>
        <Router>
          <Route
            path="/login"
            component={LoginScreen}
            authentication={useAuth}
            exact
          />
          <Sidebar useAuthent={useAuth} />
          <div className="Main-Pages">
            <PrivateRoute path="/">
              <HomeScreen />
            </PrivateRoute>
            <PrivateRoute path="/client">
              <ClientsScreen />
            </PrivateRoute>
            <PrivateRoute path="/Cases">
              <CasesScreen />
            </PrivateRoute>
            <PrivateRoute path="/Files">
              <FilesScreen />
            </PrivateRoute>
            <PrivateRoute path="/Sessions">
              <SessionsScreen />
            </PrivateRoute>
            <PrivateRoute path="/ClientDetail">
              <ClientDetail />
            </PrivateRoute>
          </div>
        </Router>
      </ProvideAuth>
    </div>
  );
};

const ProvideAuth = ({ children }) => {
  const userinfo = useSelector((states) => states.userLogin);

  const { userInfo } = userinfo;

  const auth = { user: userInfo };

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

const PrivateRoute = ({ children, ...rest }) => {
  let auth = useAuth();

  return (
    <Route
      {...rest}
      authe={auth}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
      exact
    />
  );
};

export default App;
