import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import publicRoutes from './routes';
import Header from './shared/components/Layout/Header';
import Footer from './shared/components/Layout/Footer';
import AdminLayout from './layouts/AdminLayout';
import HeaderAdmin from './shared/components/Layout/adminLayout/Header';
import FooterAdmin from './shared/components/Layout/adminLayout/Footer';
import Sidebar from './shared/components/Layout/adminLayout/Sidebar';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ProtectedRoute from './ultis/ProtectedRole';
import StudentLayout from './layouts/StudentLayout';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <BrowserRouter>
          <Routes>
            {publicRoutes.map((route, index) => {
              if (route.layout === 'admin') {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<ProtectedRoute allowedRoles={['admin']} />}
                  >
                    <Route element={<AdminLayout />}>
                      {route.children?.map((childRoute, childIndex) => (
                        <Route
                          key={childIndex}
                          path={childRoute.path}
                          element={childRoute.element}
                        />
                      ))}
                    </Route>
                  </Route>
                );
              }

              if (route.layout === 'student') {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<ProtectedRoute allowedRoles={['student']} />}
                  >
                    <Route element={<StudentLayout />}>
                      {route.children?.map((childRoute, childIndex) => (
                        <Route
                          key={childIndex}
                          path={childRoute.path}
                          element={childRoute.element}
                        />
                      ))}
                    </Route>
                  </Route>
                );
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <>
                      <Header />
                      <div>{route.element}</div>
                      <Footer />
                    </>
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </PersistGate>

    </Provider>
  );
};

export default App;
