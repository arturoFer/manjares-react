import React from 'react';

import '../estilos/header.scss';

export interface IHeaderProps{
    sinCookies: boolean
}

function Header(props: IHeaderProps) {
    return (
        <header id="top" className={props.sinCookies ? "sincookies" : undefined}>
            <h2>RECETAS DE COCINA VEGANA</h2>
        </header>
    );
}

export default Header;