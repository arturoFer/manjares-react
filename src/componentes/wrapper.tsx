import React from "react";

import '../estilos/index.scss';

import Header from './header';
import NavBar from './navbar';
import CookiesAviso from './cookiesaviso';
import ListadoRecetas from './listado';
import Footer from './footer';
import Receta from './receta';
import Favoritos from './favoritos';
import About from './about';
import Cookies from './cookies'

interface IWrapperState{
    sinCookies: boolean,
    onClick: () => void,
    onClickMenu: (i:number) => void,
    onClickReceta: (i:number) => void,
    vista: number,
    recetaArrayIndex: number
}

class Wrapper extends React.Component<{}, IWrapperState> {
    
    constructor(props: {}){
        super(props);
        this.state = {
            sinCookies: false,
            onClick: this.updateCookies,
            onClickMenu: this.updateVista,
            onClickReceta: this.updateRecetaPosicion,
            vista: 0,
            recetaArrayIndex: 0
        };
    }

    private updateCookies = () => {
        this.setState({sinCookies: true});
    }

    private updateVista = (i:number) => {
        this.setState({vista: i});
    }

    private updateRecetaPosicion = (i:number) => {
        this.setState({recetaArrayIndex: 144-i, vista: 2});
    }

    public render(){
        let componente = null;
        switch(this.state.vista) {
            case 0:
                componente = <ListadoRecetas 
                    sinCookies = {this.state.sinCookies}
                    onClickReceta = {this.state.onClickReceta} />
                break;
            case 1:
                componente = <Favoritos
                    sinCookies = {this.state.sinCookies}
                    onClickReceta = {this.state.onClickReceta} />
                break;
            case 2:
                componente = <Receta 
                    recetaArrayIndex = {this.state.recetaArrayIndex}/>
                break;
            case 3:
                componente = <About 
                    sinCookies = {this.state.sinCookies} />
                break;
            case 4:
                componente = <Cookies />
                break;
        }
        return(
            <React.Fragment>
                <CookiesAviso
                    sinCookies = {this.state.sinCookies}
                    onClick = {this.updateCookies}
                    onClickCookies = {this.updateVista} />
                <Header
                    sinCookies = {this.state.sinCookies}/>
                <NavBar
                    sinCookies = {this.state.sinCookies}
                    onClickMenu = {this.state.onClickMenu}
                    vista = {this.state.vista} />
                {componente}
                <Footer/>
            </React.Fragment>
        ); 
    }  
}

export default Wrapper;