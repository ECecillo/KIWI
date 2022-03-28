import React, { ReactNode } from "react";
import Header from "../header/Header";

type Props = {
    children: ReactNode;
};

// On définit le corp de la page (Header, content, Footer), ici on aura que la navbar dans le Header.
const Layout: React.FC<Props> = (props) => (
    <div id="test" className='flex flex-row bg-blue-500'>
        <Header />
        {/* Va caser les composants que l'on lui mettra */}
        {props.children}
        {/* Si on a besoin <Footer /> */}
    </div>
);

export default Layout;