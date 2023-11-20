import async from "../components/Async";

import {
  Bell as Bellicon,
  BookOpen as BookOpenIcon,
  Calendar as CalendarIcon,
  CheckSquare as CheckSquareIcon,
  Grid as GridIcon,
  Heart as HeartIcon,
  Layout as LayoutIcon,
  List as ListIcon,
  MapPin as MapPinIcon,
  Monitor as MonitorIcon,
  PieChart as PieChartIcon,
  Sliders as SlidersIcon,
  Users as UsersIcon,
  Film
} from "react-feather";

// Landing
import Landing from "../pages/landing/Landing";

// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Layouts
import Boxed from "../pages/layouts/Boxed";
import SidebarCollapsed from "../pages/layouts/SidebarCollapsed";
import SidebarSticky from "../pages/layouts/SidebarSticky";
import ThemeClassic from "../pages/layouts/ThemeClassic";
import ThemeCorporate from "../pages/layouts/ThemeCorporate";
import ThemeModern from "../pages/layouts/ThemeModern";
// Notifications
import Notifications from "../pages/notifications/Notifications";
// Pages
import Profile from "../pages/pages/Profile";
import Settings from "../pages/pages/Settings";
// Auth
import NewPassword from "../pages/auth/NewPassword";
import withAuth from "../HOC/withAuth";

//films
import AddFilmModal from "../pages/film/AddFilmModal";

const FilmManager = async(() => import("../pages/film/Film"));

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));
// Icons
const FontAwesome = async(() => import("../pages/icons/FontAwesome"));
const Feather = async(() => import("../pages/icons/Feather"));

// groups
const Group = async(() => import("../pages/group/Group"));
const User = async(() => import("../pages/user/User"));





//

// Routes
const landingRoutes = {
  path: "/",
  name: "Landing Page",
  component: Landing,
  children: null
};

const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboards",
  header: "Pages",
  badgeColor: "primary",
  badgeText: "5",
  icon: SlidersIcon,
  containsHome: true,
  children: [
    {
      path: "/dashboard/default",
      name: "Default",
      component: Default
    }
   
  ]
};

// const groupRoutes = {
//   path: "/groups",
//   name: "Group Management",
//   icon: ListIcon,
//   component: withAuth(Group),
//   children: null
// };

const addFilmRoutes = {
  path: "/films/add",
  name: "Add film",
  icon: Film,
  component: AddFilmModal,
  children: null
};

const filmRoutes = {
  path: "/films",
  name: "Film Manager",
  icon: ListIcon,
  component: FilmManager,
  children: null
};

const userRoutes = {
  path: "/users",
  name: "User Manager",
  icon: ListIcon,
  component: User,
  children: null
};

const userRoutes = {
  path: "/users",
  name: "User Manager",
  icon: ListIcon,
  component: User,
  children: null
};

const filmRoutes = {
  path: "/films",
  name: "Film Manager",
  icon: ListIcon,
  component: Film,
  children: null
};

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

const layoutRoutes = {
  path: "/layouts",
  name: "Layouts",
  icon: MonitorIcon,
  children: [
    {
      path: "/layouts/sidebar-sticky",
      name: "Sticky Sidebar",
      component: SidebarSticky
    },
    {
      path: "/layouts/sidebar-collapsed",
      name: "Sidebar Collapsed",
      component: SidebarCollapsed
    },
    {
      path: "/layouts/boxed",
      name: "Boxed Layout",
      component: Boxed
    },
    {
      path: "/layouts/theme-classic",
      name: "Classic Theme",
      component: ThemeClassic
    },
    {
      path: "/layouts/theme-corporate",
      name: "Corporate Theme",
      component: ThemeCorporate,
      badgeColor: "primary",
      badgeText: "New"
    },
    {
      path: "/layouts/theme-modern",
      name: "Modern Theme",
      component: ThemeModern,
      badgeColor: "primary",
      badgeText: "New"
    }
  ]
};

const notificationsRoutes = {
  path: "/notifications",
  name: "Notifications",
  icon: Bellicon,
  component: Notifications,
  children: null
};


// This route is not visisble in the sidebar
const ProfileRoutes = {
  path: "/profile",
  name: "Profile",
  component: withAuth(Profile),
  children: null
};

// This route is not visisble in the sidebar
const SettingsRoutes = {
  path: "/settings",
  name: "Settings",
  component: withAuth(Settings),
  children: null
};

// Dashboard specific routes
export const dashboard = [
  //addAccountAdminRoutes,

  addFilmRoutes,
  filmRoutes,
  dashboardRoutes,
  //groupRoutes,
  userRoutes,
  //pageRoutes,

  layoutRoutes,
  ProfileRoutes,
  SettingsRoutes
];

// Landing specific routes
export const landing = [landingRoutes];

// Auth specific routes
export const page = [authRoutes];

// All routes
export default [
  //addAccountAdminRoutes,
  addFilmRoutes,
  filmRoutes,
  dashboardRoutes,
  //groupRoutes,
  userRoutes,
  // pageRoutes,

  authRoutes,
 
];
