import Map from "./components/Map/Map";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import NavBar from "./components/Navbar";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import PreferencesPage from "./components/preferences/PreferencesPage";

function App() {
  const { token, username, login, logout } = useAuth();

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          username: username,
          login: login,
          logout: logout,
        }}
      >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/preferences" element={<PreferencesPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
