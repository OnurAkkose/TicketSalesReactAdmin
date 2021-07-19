/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Redirect, Route, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import { AppProfile } from "./AppProfile";

import { Toast } from "primereact/toast";

import PrimeReact from "primereact/api";
import { menu } from "./menu";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../src/store/index";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "./layout/flags/flags.css";
import "./layout/layout.scss";
import "./App.scss";

import { sendNotifyMessage } from "./store/actions/core/CoreActions";

import {AuthPage} from "./pages/authentication/AuthPage";
import { CompanyPage } from "./pages/company/CompanyPage";
import { TicketPage } from "./pages/ticket/TicketPage";
import { EmptyPage } from "./pages/EmptyPage";
const App = () => {
    return (
        <>
            <Provider store={store}>
                <ContainerApp />
            </Provider>
        </>
    );
};

export default App;

const ContainerApp = () => {
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("dark");
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(false);
    const sidebar = useRef();
  
    const toast = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();  
    const { message, type } = useSelector((state) => state.core.notification);
    useEffect(() => {
        if (message && type) {
            if (type === "success") toast.current.show({ severity: type, summary: "İşlem Başarılı", detail: message, life: 3000 });
            else if (type === "error") toast.current.show({ severity: type, summary: "İşlem Başarısız", detail: message, life: 3000 });

            dispatch(sendNotifyMessage({}));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message, type]);

    let menuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
        menuClick = false;
    };

    const onToggleMenu = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                setOverlayMenuActive((prevState) => !prevState);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }
        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const isDesktop = () => {
        return window.innerWidth > 1024;
    };

    const isSidebarVisible = () => {
        if (isDesktop()) {
            if (layoutMode === "static") return !staticMenuInactive;
            else if (layoutMode === "overlay") return overlayMenuActive;
            else return true;
        }

        return true;
    };

    const logo = "assets/layout/images/gurallar.png";

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": ripple === false,
    });

    const sidebarClassName = classNames("layout-sidebar", {
        "layout-sidebar-dark": layoutColorMode === "dark",
        "layout-sidebar-light": layoutColorMode === "light",
    });
    
    
       
    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <AppTopbar onToggleMenu={onToggleMenu} />
            <Toast ref={toast} />

            <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
                <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
                    <AppProfile />
                    <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
                </div>
            </CSSTransition>
  
            <div className="layout-main">
               <Route path="/"  component={EmptyPage} />
                <Route path="/company" component={CompanyPage} />               
                <Route path="/ticket" component={TicketPage} />              
            </div>

            <AppFooter />
        </div>
    );
};
