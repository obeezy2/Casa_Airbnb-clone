import { Homepage } from './views/Homepage'
import { StayApp } from "./views/stay-app"
import { HostPage } from "./views/host-page";
import { StayDetails } from "./views/stay-details";
import { LoginSignup } from "./views/login-signup.jsx";


// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <Homepage />
    },
    {
        path: 'stays',
        component: <StayApp />
    },
    {
        path: 'host',
        component: <HostPage />
    },
    {
        path: 'stay/details/:stayId',
        component: <StayDetails />
    },
    // {
    //     path: '/login',
    //     component: LoginSignup,
    // },
]

export default routes
