import React from "react";

import LazyImage from './lazyimage';

import '../estilos/listado.scss';

interface Receta{
    posicion: number,
    title: string,
};

interface IListadoState{
    recetas: Receta[],
};

interface IListadoProps{
    sinCookies: boolean,
    onClickReceta: (i:number) => void
}

class ListadoRecetas extends React.Component<IListadoProps, IListadoState> {

    private observer: IntersectionObserver;

    constructor(props: IListadoProps){
        super(props);
        this.state = {
            recetas: []
        };
        const config = {
            rootMargin: '0px 0px 128px 0px'
        }
        this.observer = new IntersectionObserver((entries, self) =>{
            entries.forEach(entry  => {
                if(entry.isIntersecting){
                    let target: HTMLImageElement = entry.target as HTMLImageElement;
                    target.src = target.dataset.src as string;
                    self.unobserve(entry.target);
                }
            });
        }, config);
    }

    public componentDidMount(){
        this.getData();
    }

    public componentDidUpdate(){
        window.scrollTo(0,0);
    }

    private async getData(){
        let data;
        const store = localStorage.getItem('data');
        if(!store){
            const response = await fetch('data/manjares.json');
            data = await response.json();
            data.reverse();
            localStorage.setItem('data', JSON.stringify(data));
        } else {
            data = JSON.parse(store);
        }
        const recetas : Receta[] = data.map(function(receta:Receta){
            const title = receta.title;
            const posicion = receta.posicion;
            return {
                title,
                posicion
            }
        });
        this.setState({ recetas });
    }

    private handleClickReceta = ( i:number) => {
        this.props.onClickReceta(i);
    }

    public render() {
        const images = this.state.recetas.map((receta) => {
            if(receta.posicion > 129) {
                return (
                   <div className="item" key={receta.posicion} onClick={() => this.handleClickReceta(receta.posicion)}>
                       <a>
                           <img alt={"Foto receta " + receta.posicion + ".jpg"} src={"images/" + receta.posicion + ".jpg"}/>
                           <p>{receta.title}</p>
                       </a>
                   </div>
                );
            } else {
                return(
                    <div className="item" key={receta.posicion} onClick={() => this.handleClickReceta(receta.posicion)}>
                       <a>
                           <LazyImage
                                posicion= {receta.posicion}
                                observer= {this.observer}
                           />
                           <p>{receta.title}</p>
                       </a>
                   </div>
                );  
            }
        });
        return(
            <div id="page" role="main">
                <article>
                    <header>
                        <h2 className={this.props.sinCookies ? "sincookies" : undefined}>Listado de recetas veganas</h2>
                    </header>
                    <div className="gallery">
                        {images}
                    </div>
                </article>
            </div>
        );
    }
}

export default ListadoRecetas;