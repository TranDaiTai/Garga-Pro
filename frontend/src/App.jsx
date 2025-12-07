import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layout/DefaultLayout";
import { protectedRoutes, authRoutes ,publicRoutes} from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          const Layout =
            route.layout === null ? Fragment : route.layout ?? DefaultLayout;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {/* Protected Routes */}
        {protectedRoutes.map((route, index) => {
          const Page = route.component;
          const Layout =
            route.layout === null ? Fragment : route.layout ?? DefaultLayout;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {/* Auth Routes */}
        {authRoutes.map((route, index) => {
          const Page = route.component;
          const Layout =
            route.layout === null ? Fragment : route.layout ?? DefaultLayout;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
