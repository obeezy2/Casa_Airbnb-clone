import { useEffect, useState } from "react";
import { isElement } from "react-dom/test-utils";
import { NavLink as Link, useLocation } from "react-router-dom";

import { StayFilter } from "./stay-filter.jsx";

import logoImg from "../assets/img/logo/new-logo.svg";
import logoImg2 from "../assets/img/logo/whitelogo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export function AppHeader() {
    const [color, setColor] = useState("white");
    const [bgColor, setBgColor] = useState("black");
    const [img, setImg] = useState(logoImg2);
    const [logoColor, setLogoColor] = useState("white");
    let location = useLocation();

    const changeColors = (ev) => {

        if (ev.path[1].scrollY === 0) {
            setColor("white");
            setBgColor("black");
            setLogoColor("white");
            setImg(logoImg2);
        }
        if (ev.path[1].scrollY > 1) {
            setColor("black");
            setBgColor("white");
            setImg(logoImg);
            setLogoColor("#FF385C");
        }
    };

    useEffect(() => {
        if (location.pathname === "/") {
            window.addEventListener("scroll", changeColors);
            setColor("white");
            setBgColor("black");
            setLogoColor("white");
            setImg(logoImg2);
        }
        return () => {
            window.removeEventListener("scroll", changeColors);
            setColor("black");
            setBgColor("white");
            setImg(logoImg);
            setLogoColor("#FF385C");
        }

    }, [location.pathname]);

    return (
        <header
            className="app-header"
            style={{ color: `${color}`, backgroundColor: `${bgColor}` }}
        >
            <div className="search-bar ">
                {" "}
                <StayFilter />
            </div>
            <Link className="explore" to="/stays">
                Explore
            </Link>
            <Link className="host" to="/">
                Become a Host
            </Link>
            <Link className="user" to="/login">
                <AccountCircleIcon />
            </Link>
            <div className="logo">
                <img className="img-logo" src={`${img}`}></img>
                <Link to="/">
                    {" "}
                    <h1 style={{ color: `${logoColor}` }} className="text">
                        casa{" "}
                    </h1>
                </Link>
            </div>
        </header>
    );
}
