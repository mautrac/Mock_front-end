import React, { Suspense } from "react";
import {Navbar} from "../component/Navbar";
const Layout = (props) => {

    return (
        <>
            <main>
                <Navbar />
                <Suspense fallback={<div>Loading page</div>}>
                    {props.children}

                </Suspense>
            </main>
        </>
    )
    
}

export default Layout;