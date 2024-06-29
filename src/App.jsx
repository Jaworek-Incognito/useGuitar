import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import axios from "axios";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./styles/GlobalStyles";
import { StyleSheetManager } from "styled-components";

import AppLayout from "./features/layout/AppLayout";
import Home from "./pages/Home";
import Guitars from "./features/guitars/Guitars";
import PageNotFound from "./ui/PageNotFound";
import ProductDetails from "./pages/ProductDetails";
import Login from "./features/account/Login";
import Signup from "./features/account/Signup";
import Amplifiers from "./features/amplifiers/Amplifiers";
import Pickups from "./features/pickups/Pickups";
import MultiEffects from "./features/multiEffects/MultiEffects";

import Cart from "./features/cart/Cart";
import Delivery from "./pages/Delivery";
import OrderOverview from "./features/cart/OrderOverview";
import Payment from "./features/cart/Payment";
import Account from "./features/account/Account";
import Order from "./features/account/Order";
import VerifyEmail from "./features/account/VerifyEmail";
import ResetPassword from "./features/account/ResetPassword";

axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <StyleSheetManager shouldForwardProp={() => true}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <GlobalStyles />

        <BrowserRouter>
          <Routes>
            <Route path="payment/:id" element={<Payment />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="account/verify-email" element={<VerifyEmail />} />
            <Route path="account/reset-password" element={<ResetPassword />} />

            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="guitars" element={<Guitars />} />
              <Route path="amplifiers" element={<Amplifiers />} />
              <Route path="pickups" element={<Pickups />} />
              <Route path="multiEffects" element={<MultiEffects />} />

              <Route path="cart" element={<Cart />} />
              <Route path="cart/delivery" element={<Delivery />} />
              <Route path="cart/overview" element={<OrderOverview />} />

              <Route path="account" element={<Account />} />
              <Route path="account/order/:id" element={<Order />} />

              <Route
                path="guitars/product/:name"
                element={<ProductDetails />}
              />
              <Route
                path="amplifiers/product/:name"
                element={<ProductDetails />}
              />
              <Route
                path="pickups/product/:name"
                element={<ProductDetails />}
              />
              <Route
                path="multiEffects/product/:name"
                element={<ProductDetails />}
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: "8px",
          }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
            },
          }}
        />
      </QueryClientProvider>
    </StyleSheetManager>
  );
}

export default App;
