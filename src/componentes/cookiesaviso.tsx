import React from 'react';

import '../estilos/cookiesaviso.scss'

export interface ICookiesProps {
    sinCookies: boolean,
    onClick: () => void,
    onClickCookies: (i: number) => void
}

class CookiesAviso extends React.Component<ICookiesProps, {}> {

    public componentDidMount(){
        
        if(sessionStorage.getItem("cookiesAceptadas")) {
            this.props.onClick();
        } 
    }

    private onClickCookies = () => {
        sessionStorage.setItem("cookiesAceptadas", "true");
        this.props.onClick();
    }

    private handleCookiesVista = () => {
        this.props.onClickCookies(4);
    }

    public render(){
        return(
            <aside id="wrapper_cookies" className={ this.props.sinCookies ? "hidden" : "cookies" } role="complementary" >
                <p>Esta web usa cookies. <a onClick = {this.handleCookiesVista} title="Información sobre las cookies">Más Info</a></p>
                <button 
                    id="close_cookies" 
                    type="button" 
                    title="Cerrar" 
                    onClick={this.onClickCookies}>X
                </button>
            </aside> 
        )
    }

}

export default CookiesAviso;