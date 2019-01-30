import Dashboard from "layouts/Dashboard/Dashboard.jsx";

const indexRoutes = [
    { path: "/", component: Dashboard },
    { path: "/private", component: Dashboard, private: true },
];

export default indexRoutes;
