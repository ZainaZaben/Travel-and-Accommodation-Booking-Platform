import { FC, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectRoute";
import { UserRole } from "../constant/auth";
import BlockUI from "../container/BlockUI";
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const Order = lazy(() => import("../pages/User/order"));
const AdminHome = lazy(() => import("../pages/Admin"));
const Hotels = lazy(() => import("../pages/Admin/component/Hotels"));
const Rooms = lazy(() => import("../pages/Admin/component/Rooms"));
const Login = lazy(() => import("../pages/Login"));
const UserHome = lazy(() => import("../pages/User"));


const AppLayout = lazy(() => import("../container/AppLayout"));

const Hotel = lazy(() => import("../pages/User/component/Hotel"));

const Home = lazy(() => import("../pages/User/component/Home"));
const SearchPage = lazy(() => import("../pages/User/component/SearchPage"));
const Confirmation = lazy(() => import("../pages/User/component/Confirmation"));

const AppRoutes: FC = () => {
  const { User, Admin } = UserRole;
  return (
    <Suspense fallback={<BlockUI isBlocked={true} />}>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route element={<ProtectedRoute allowedRoles={[User]} />}>
          <Route path="" element={<Home />} />
          <Route path="userhome" element={<UserHome />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="hotel/:id" element={<Hotel />} />
          <Route path="order" element={<Order />} />
          <Route path="confirmation" element={<Confirmation />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route element={<ProtectedRoute allowedRoles={[Admin]} />}>
            <Route path="manageCities" element={<AdminHome />} />
            <Route path="manageHotels" element={<Hotels />} />
            <Route path="manageRooms" element={<Rooms />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
