import Home from "./components/admin/pages/home/Home";
import Login from "./components/admin/pages/login/Login";
import List from "./components/admin/pages/list/List";
import Single from "./components/admin/pages/single/Single";
import New from "./components/admin/pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./components/admin/formSource";
import "./components/admin/style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./components/admin/context/darkModeContext";

import LoginePage from "./components/auth/login";
import AuthorizationPage from "./components/auth/login/AuthorizationPage";
import RegisterPage from "./components/auth/register";
import DefaultLayout from "./components/containers/default";
import AdminLayout from "./components/containers/admin/AdminLayout";
import FAQs from "./components/Pages/FAQs/FAQs";

import Header from "./components/NavBar/header";
import MainPage from "./components/Pages/Main/MainPage";
import Register from "./components/auth/register";
import Men from "./components/Pages/Man and Woman Page/MenPage";
import BreadCrumbs from "./components/BreadCrumbs/breadCrumbs";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="customer-care" element={<FAQs />} />
        <Route path="/men" element={<Men/>}/>
      </Routes>
      {/* <Route path="/" element={<DefaultLayout />}>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<LoginePage />} />
            <Route path="login" element={<AuthorizationPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>

            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>

          
          <Route path="customer-care" element={<FAQs />}/>

        </Routes>
      </div>
=======
        </Routes> */}
    </>
  );
}

export default App;
