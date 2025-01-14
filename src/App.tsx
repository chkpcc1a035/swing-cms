import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./components/Login";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "@mantine/core/styles.css";
import { Settings } from "./components/Settings";
import { Inventory } from "./components/Inventory";
import { SeriesControl } from "./components/SeriesControl";
import "./i18n";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Outlet />
                  </Layout>
                </ProtectedRoute>
              }
            >
              <Route path="inventory" element={<Inventory />} />
              <Route path="settings" element={<Settings />} />
              <Route path="series" element={<SeriesControl />} />
              <Route index element={<Inventory />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
