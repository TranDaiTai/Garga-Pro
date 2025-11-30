import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import publicRoutes from './Routes';
import DefaultLayout from './components/layout/DefaultLayout'; // nhớ import

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}

      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;

          const Layout = route.layout === null ? Fragment : (route.layout ?? DefaultLayout);

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

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;