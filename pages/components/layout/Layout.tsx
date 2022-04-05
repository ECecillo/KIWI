import React, { ReactNode } from "react";
import Header from "../header/Header";

type Props = {
    children: ReactNode;
};

// On définit le corp de la page (Header, content, Footer), ici on aura que la navbar dans le Header.
const Layout: React.FC<Props> = (props) => (
    <div className='flex flex-row h-screen'>
        <Header />
        {/* Va caser les composants que l'on lui mettra */}
        {props.children}
        {/* Si on a besoin <Footer /> */}
    </div>
);

export default Layout;