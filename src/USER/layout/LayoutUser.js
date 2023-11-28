import React from "react";
import {Navbar} from "../component/Navbar";
const Layout = (props) => {

    return (
        <>
            <main>
                <Navbar />
                {props.children}
            </main>
        </>
    )
    
}

export default Layout;