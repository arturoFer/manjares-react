import React from "react";

import LazyImage from './lazyimage';

interface Receta {
    posicion: number,
    title: string
}

interface IFavoritosState{
    recetas: Receta[],
    favorites: boolean
}

interface IFavoritosProps{
    sinCookies: boolean,
    onClickReceta: (i:number) => void
}

class Favoritos extends React.Component<IFavoritosProps, IFavoritosState>{
    
    private observer: IntersectionObserver;

    constructor(props: IFavoritosProps){
        super(props);
        this.state = {
            recetas: [],
            favorites: false
        };
        const config = {
            rootMargin: '0px 0px 128px 0px'
        }
        this.observer = new IntersectionObserver((entries, self) => {
            entries.forEach(entry => {
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
        let favoritesStore = localStorage.getItem("favoritos");
        let favoritesObject;
        let data: Receta[];
        if(favoritesStore){
            favoritesStore = "[" + favoritesStore.slice(1,-1) + "]";
            favoritesObject = JSON.parse(favoritesStore);
            const dataStore = localStorage.getItem("data");
            if(!dataStore){
                const response = await fetch('data/manjares.json');
                data = await response.json();
                data.reverse();
                localStorage.setItem('data', JSON.stringify(data));
            } else{
                data = JSON.parse(dataStore);
            }
            const recetas: Receta[] = favoritesObject.map(function(i: number){
                const posicion = data[i].posicion;
                const title = data[i].title;
                return {posicion, title};
            });
            const favorites= true;
            this.setState({recetas, favorites});   
        } else {
            const favorites = false;
            const recetas: Receta[] = [];
            this.setState({recetas, favorites});
        }
    }

    public handleClickReceta = (i: number) => {
        this.props.onClickReceta(i)
    }

    private hallaClase(): string | undefined{
        if(this.state.favorites){
            return "hidden";
        } else if(this.props.sinCookies){
            return "sincookies"
        } else {
            return undefined;
        }
    }

    public render(){
        const images = this.state.recetas.map((receta) => {
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
        });
        return (
            <div id="page" role="main">
                <div id="sinFavoritos" className={this.hallaClase()}>
                    <h3>ESTA LISTA ESTÁ VACÍA</h3>
                    <p>
                        Aún no has añadido ninguna receta a tus favoritas. Para añadirla 
                        pulsa sobre la estrella en tus recetas preferidas y estarán todas juntas 
                        disponibles en esta vista.
                    </p>
                </div>
                <article className={this.state.favorites ? undefined : "hidden"}>
                    <header>
                        <h2 className={this.props.sinCookies ? "sincookies" : undefined}>Tus recetas favoritas</h2>
                    </header>
                    <div className="gallery">
                        {images}
                    </div>
                </article>
        </div>
        );
    }
}

export default Favoritos;