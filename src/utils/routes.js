import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import About from "../pages/About";
import {Navigate} from "react-router-dom";
import Team from "../pages/Team";
import Products from "../pages/Products";
import Player from "../pages/Player";

export const HOME_PAGE = "/"
export const ABOUT_PAGE = "/about"
export const TEAM_PAGE = "/team"
export const LOGIN_PAGE = "/login"
export const REGISTER_PAGE = "/register"
export const PRODUCTS_PAGE = "/product"


export const publicRoutes = [
    {path: LOGIN_PAGE, element: <Login/>, name: 'Login', menu: true},
    {path: REGISTER_PAGE, element: <Register/>, name: 'Register', menu: true},
    {path: "*", element: <Navigate to={LOGIN_PAGE}/>}
]


export const privateRoutes = [
    {path: HOME_PAGE, element: <Home/>, name: 'Home', menu: true},
    {path: ABOUT_PAGE, element: <About/>, name: 'About', menu: true},
    { path: TEAM_PAGE,  name: 'Team', menu: true,children:[{
        index:true,
            element: <Team/>,
        },
            {
             path:":id",
             element:<Player/>
            }]},
    {path: PRODUCTS_PAGE, element: <Products/>, name: 'Product', menu: true},
    {path: "*", element: <Navigate to={HOME_PAGE}/>}
]

