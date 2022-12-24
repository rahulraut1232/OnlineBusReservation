import "./App.css";
import SignInScreen from "./screens/SignInScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import Footer from "./components/Footer";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ShowBookingScreen from "./screens/ShowBookingScreenClass";
//import ShowBookingScreen from "./screens/ShowBookingScreen";
import AddRouteScreen from "./screens/AddRouteScreen";
import AddBusScreen from "./screens/AddBusScreen";
import AddManagerScreen from "./screens/AddManagerScreen";
import AddAgentScreen from "./screens/AddAgentScreen";
import AddDriverScreen from "./screens/AddDriverScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import RoyalTravelsScreen from "./screens/RoyalTravelsScreen";
import viewProfileScreen from "./screens/ViewProfileScreen";
import PaymentStatusScreen from "./screens/PaymentStatusScreen";
import MakePaymentScreen from "./screens/MakePaymentScreen";
import ManagerHomeScreen from "./screens/ManagerHomeScreen";
import OwnerHomeScreen from "./screens/OwnerHomeScreen";
import ViewBusScreen from "./screens/ViewBusScreen";
import ViewBookingsScreen from "./screens/ViewBookingsScreen";
import CheckReservationScreen from "./screens/CheckReservationScreen";
import ChangePasswordScreen from "./screens/ChangePassswordScreen";
import DeleteAccountScreen from "./screens/DeleteAccountScreen";
import BusScheduleScreen from "./screens/BusScheduleScreen";
import viewProfileManager from "./screens/ViewProfileManager";
import EditProfileManager from "./screens/EditProfileManager";
import ViewProfileOwner from "./screens/ViewProfileOwner";
import EditProfileOwner from "./screens/EditProfileOwner";
import UserNavigation from "./components/UserNavigation";
import OwnerNavigation from "./components/OwnerNavigation";
import ManagerNavigation from "./components/ManagerNavigation";
import HomeNavigation from "./components/HomeNavigation";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const user = localStorage.getItem("user");
  return (
    <div>
      <Router>
        <div className="">
          <Switch>
            <Route path="/signin" component={SignInScreen} />
            <Route path="/signup" component={SignupScreen} />
            <Route path="/about" component={AboutScreen} />
            <Route path="/contact" component={ContactScreen} />
            
            <Route path="/add-route" component={AddRouteScreen} />
            <Route path="/add-bus" component={AddBusScreen} />
            <Route path="/add-manager" component={AddManagerScreen} />
            <Route path="/add-agent" component={AddAgentScreen} />
            <Route path="/add-driver" component={AddDriverScreen} />
            <Route path="/edit-profile" component={EditProfileScreen} />
            <Route path="/edit-profile-manager" component={EditProfileManager} />
            <Route path="/edit-profile-owner" component={EditProfileOwner} />
            <Route path="/royal-travels" component={RoyalTravelsScreen} />
            <Route path="/view-profile" component={viewProfileScreen} />
            <Route path="/view-profile-manager" component={viewProfileManager} />
            <Route path="/view-profile-owner" component={ViewProfileOwner} />
            <Route path="/make-payment" component={MakePaymentScreen} />
            <Route path="/payment-status" component={PaymentStatusScreen} />
            <Route path="/manager" component={ManagerHomeScreen} />
            <Route path="/owner" component={OwnerHomeScreen} />
            <Route path="/view-bus" component={ViewBusScreen} />
            <Route path="/view-bookings" component={ViewBookingsScreen} />
            <Route path="/change-password" component={ChangePasswordScreen} />
            <Route path="/delete-account" component={DeleteAccountScreen} />
            <Route
              path="/check-reservation"
              component={CheckReservationScreen}
            />
            <Route path="/bus-schedule" component={BusScheduleScreen} />
            
            <Route path="/my-bookings" component={ShowBookingScreen} />
            <Route path="/" component={HomeScreen} />
          </Switch>
          <ToastContainer/>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
