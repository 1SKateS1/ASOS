import Home from "./components/admin/pages/home/Home";
import Login from "./components/admin/pages/login/Login";
import List from "./components/admin/pages/list/List";
import Single from "./components/admin/pages/single/Single";
import New from "./components/admin/pages/new/New";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { productInputs, userInputs } from "./components/admin/formSource";
import "./components/admin/style/dark.scss";
import { useContext, useEffect, useLayoutEffect } from "react";
import { DarkModeContext } from "./components/admin/context/darkModeContext";

import LoginePage from "./components/auth/login";
import RegisterPage from "./components/auth/register";
import DefaultLayout from "./components/containers/default";
import AdminLayout from "./components/containers/admin/AdminLayout";
import FAQs from "./components/Pages/FAQs/FAQs";

import BasketEmpty from "./components/Pages/BasketEmpty/BasketEmpty";
import Header from "./components/NavBar/header";
import Basket from "./components/Pages/Basket/Basket";
import MainPage from "./components/Pages/Main/MainPage";
import Register from "./components/auth/register";
import Men from "./components/Pages/Man and Woman Page/MenPage";
import BreadCrumbs from "./components/BreadCrumbs/breadCrumbs";
import Women from "./components/Pages/Man and Woman Page/WomanPage";

import ContactInf from "./components/Pages/Account/ContactInf/ContactInf";

import Payment from "./components/Pages/Account/Payment/Payment";
import PaymentEmpty from "./components/Pages/Account/PaymentEmpty/PaymentEmpty";

import Returns from "./components/Pages/Account/Returns/Returns";
import ReturnsEmpty from "./components/Pages/Account/ReturnsEmpty/ReturnsEmpty";

import Favourites from "./components/Pages/Account/Favourites/Favourites";
import CustomerService from "./components/Pages/CustomerService/CustomerService";
import Checkout from "./components/Pages/Checkout/Checkout";

import Error from "./components/Pages/Error/error";
import ProductsPage from "./components/Pages/ItemsPage/ProductsPage";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="admin" element={<AdminLayout />} />

        <Route path="customer-care" element={<FAQs />} />
        <Route path="customer-service" element={<CustomerService />} />

        <Route path="basket-empty" element={<BasketEmpty />} />
        <Route path="basket" element={<Basket />} />

        <Route path="/account/contact-information" element={<ContactInf />} />

        <Route path="/account/shopping-history" element={<Payment />} />
        <Route
          path="/account/shopping-history-empty"
          element={<PaymentEmpty />}
        />

        <Route path="/account/returns" element={<Returns />} />
        <Route path="/account/returns-empty" element={<ReturnsEmpty />} />

        <Route path="/account/favourites" element={<Favourites />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/ViewAll" element={<ProductsPage />} />
        <Route path="*" element={<Error />} />
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
        </Routes> */}
    </>
  );
}

export default App;
