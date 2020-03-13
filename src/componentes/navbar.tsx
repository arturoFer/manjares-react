import React from 'react';

import '../estilos/navbar.scss';

interface INavBarProps {
    sinCookies: boolean,
    onClickMenu: (i: number) => void,
    vista: number
}

interface INavBarState {
    menuClass: boolean;
}

class NavBar extends React.Component <INavBarProps, INavBarState>{
    
    public state = {
        menuClass : false
    };

    private handleMenu = () => {
        this.setState((prevState:INavBarState) => {
            return { menuClass: !prevState.menuClass }
        });
    }

    private handleMenuLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const texto = e.currentTarget.title;
        let vista=0;
        switch(texto){
            case "Listado de recetas":
                vista = 0;
                break;
            case "Tus recetas favoritas":
                vista = 1;
                break;
            case "Recetas Veganas":
                vista = 2;
                break;
            case "Acerca de Manjares a diario":
                vista = 3;
                break;
        }
        this.props.onClickMenu(vista);
    }

    public render(){
        return(
            <nav>
                <ul id="main-nav" 
                    tabIndex={0} 
                    className={this.props.sinCookies ? "sincookies" : undefined}>
                    <li className="brand">
                        <h1><a href="/">MANJARES A DIARIO</a></h1>
                    </li>
                    <li>
                        <button 
                            id="btn-nav" 
                            onClick={this.handleMenu}
                            type="button" 
                            className={this.props.sinCookies ? "sincookies" : undefined}>
                        </button>
                        <ul 
                            id="menu" 
                            className={this.state.menuClass ? "desplegado" : undefined }>
                            <li className={ (this.props.vista === 0) ? "active" : undefined }>
                                <a title="Listado de recetas" onClick={ this.handleMenuLink }>LISTADO</a>
                            </li>
                            <li className={ (this.props.vista === 1) ? "active" : undefined }>
                                <a title="Tus recetas favoritas" onClick={ this.handleMenuLink }>FAVORITAS</a>
                            </li>
                            <li className={ (this.props.vista === 2) ? "active" : undefined }>
                                <a id="menuRece" title="Recetas Veganas" onClick={ this.handleMenuLink }>RECETA</a>
                            </li>
                            <li className={ (this.props.vista === 3) ? "last active" : "last" }>
                                <a title="Acerca de Manjares a diario" onClick={ this.handleMenuLink }>SOBRE</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;