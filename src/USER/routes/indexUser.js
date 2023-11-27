import { lazy } from "react";

import {
    Bell as Bellicon,
    Monitor as MonitorIcon,
    Sliders as SlidersIcon,
    Users as UsersIcon,
    Film,
    CheckCircle
  } from "react-feather";

// Auth
import SignIn from "../../pages/auth/SignIn";
import SignUp from "../../pages/auth/SignUp";
import ResetPassword from "../../pages/auth/ResetPassword";
import Page404 from "../../pages/auth/Page404";
import Page500 from "../../pages/auth/Page500";
import NewPassword from "../../pages/auth/NewPassword";
// Film
import FilmInfor from "../../pages/film/FilmInfor"

const TicketView = lazy(() => import("../pages/TicketPage"));
const FilmPage = lazy(() => import("../pages/FilmsPage"));
const Schedule = lazy(() => import("../../pages/schedule/Schedule"))

const authRoutes = {
    path: "/auth",
    name: "Auth",
    icon: UsersIcon,
    badgeColor: "secondary",
    badgeText: "Special",
    children: [
      {
        path: "/auth/sign-in",
        name: "Sign In",
        component: SignIn
      },
      {
        path: "/auth/sign-up",
        name: "Sign Up",
        component: SignUp
      },
      {
        path: "/auth/reset-password",
        name: "Reset Password",
        component: ResetPassword
      },
      {
        path: "/auth/new-password/:token",
        name: "New Password",
        component: NewPassword
      },
      {
        path: "/auth/404",
        name: "404 Page",
        component: Page404
      },
      {
        path: "/auth/500",
        name: "500 Page",
        component: Page500
      }
    ]
  };

const viewFilmRoutes = {
    path: "/",
    name: "Film View",
    component: FilmPage,
    children: null
}

const ticketViewRoutes = {
    path: "/tickets",
    name: "Ticket View",
    component: TicketView,
    children: null
};

const filmScheduleViewRoutes = {
    path: "/schedules",
    name: "Schedules View",
    component: Schedule,
    children: null
}

const filmInforViewRoutes = {
    path: "/film/:id",
    name: "FilmInfor View",
    component: FilmInfor,
    children: null
}

const ticketPriceView = {
    path: "/ticket-price",
    name: "Ticket price View",
    component: TicketView,
    children: null
}

export const page = [authRoutes];

export const UserHome = [ticketViewRoutes];

export default [
    authRoutes,
    filmInforViewRoutes,
    viewFilmRoutes,
    filmScheduleViewRoutes,
    ticketPriceView
];