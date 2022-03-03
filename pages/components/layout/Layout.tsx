import React, { ReactNode } from "react";
import Header from "../Header/Header";

type Props = {
    children: ReactNode;
};


// On définit le corp de la page (Header, content, Footer), ici on aura que la navbar dans le Header.
const Layout: React.FC<Props> = (props) => (
    <div className='flex flex-row'>
        <Header />
        {props.children}
    </div>
);

export default Layout;