import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout/Layout";
import { useEffect, lazy } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { RefreshUserThunk } from "./redux/auth/operations";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/Home/HomePage"));
const RegisterPage = lazy(() => import("./pages/Register/RegisterPage"));
const LoginPage = lazy(() => import("./pages/Login/LoginPage"));
const ContactsPage = lazy(() => import("./pages/Contacts/ContactsPage"));

const App = () => {
  const dispatch = useDispatch();

  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(RefreshUserThunk());
  }, [dispatch]);
  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="contacts"
            element={
              <PublicRoute>
                <ContactsPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PrivateRoute>
                <LoginPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <RegisterPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
