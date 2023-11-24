import { lazy } from "react";

const TicketView = lazy(() => import("../pages/TicketPagejs"));
const FilmPage = lazy(() => import("../pages/FilmsPage"));

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




const UserHome = [ticketViewRoutes];