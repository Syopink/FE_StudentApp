import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import publicRoutes from './routes';
import Header from './shared/components/Layout/Header';
import Footer from './shared/components/Layout/Footer';
import AdminLayout from './layouts/AdminLayout';
import HeaderAdmin from './shared/components/Layout/adminLayout/Header';
import FooterAdmin from './shared/components/Layout/adminLayout/Footer';
import Sidebar from './shared/components/Layout/adminLayout/Sidebar';
import { AuthProvider } from './ultis/AuthContext';
const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          // Kiểm tra nếu route là trang Admin, sử dụng AdminLayout và không hiển thị Header/Footer
          if (route.layout === 'admin') {
            return (
              <>              
              <Route key={index} path={route.path} element={<AdminLayout />}>
                {route.children &&
                  route.children.map((childRoute, childIndex) => (
                    <Route
                      key={childIndex}
                      path={childRoute.path}
                      element={childRoute.element}
                    />
                  ))}
              </Route>
              </>

            );
          }

          // Hiển thị Header và Footer cho các route không phải admin (Home, Login)
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  <Header />
                  {/* Render component chính ở đây */}
                  <div>{route.element}</div> 
                  <Footer />
                </>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
