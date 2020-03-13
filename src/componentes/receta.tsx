import React from 'react';

import '../estilos/receta.scss';

interface RecetaType{
    posicion: number,
    videoId: string,
    title: string,
    description: string
}

interface IRecetaState{
    receta: RecetaType,
    isFavorite: boolean
}

interface IRecetaProp{
    recetaArrayIndex: number
}

class Receta extends React.Component<IRecetaProp, IRecetaState>{

    private arrayIndex: number;
    private isScroll: boolean;

    constructor(props:IRecetaProp){
        super(props);
        this.state = {
            receta: {
                posicion: 1,
                videoId: '',
                title: '',
                description: ''
            },
            isFavorite: false
        }
        this.arrayIndex = this.props.recetaArrayIndex;
        this.isScroll = true;
    }

    public componentDidMount(){
        this.getData(this.props.recetaArrayIndex);
    }

    public componentDidUpdate(){
        if(this.isScroll){
            window.scrollTo(0,0);
        }
    }

    private async getData(indexArray: number){
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
        
        const posicion = data[indexArray].posicion;
        const videoId = data[indexArray].videoId;
        const title = data[indexArray].title;
        const description = data[indexArray].description.replace(/\\n/g, '\n');
        const receta = {posicion, videoId, title, description};
        const favorite = this.checkFavorite();
        this.setState({ receta, isFavorite: favorite });
    }

    private onPrev = () => {
        this.arrayIndex = 144 - this.state.receta.posicion - 1;
        this.isScroll = true;
        this.getData(this.arrayIndex);
    }

    private onNext = () => {
        this.arrayIndex = 144 - this.state.receta.posicion +1;
        this.isScroll = true;
        this.getData(this.arrayIndex);
    }

    private onAzar = () => {
        this.arrayIndex = Math.floor(Math.random()*144);
        this.isScroll = true;
        this.getData(this.arrayIndex);
    }

    private checkFavorite(): boolean{
        const arrayIndexLocal = this.arrayIndex;
        const store = localStorage.getItem("favoritos");
        const storable = "," + arrayIndexLocal + ",";
        if(store){
            const index = store.indexOf(storable);
            if(index === -1){
                return false;
            } else{
                return true;
            }
        } else {
            return false;
        }
    }

    private onFav = () => {
        const arrayIndexLocal = this.arrayIndex;
        let storable = arrayIndexLocal + ",";
        let store = localStorage.getItem("favoritos");
        this.isScroll = false;
        if(store){
            const index = store.indexOf("," + storable);
            if(index === -1){
                store += storable;
                localStorage.setItem("favoritos", store);
                this.setState({isFavorite: true});
            } else{
                store = store.replace("," + storable, ",");
                if(store === ","){
                    store = "";
                }
                localStorage.setItem("favoritos", store);
                this.setState({isFavorite: false});
            }
        } else{
            storable = "," + storable;
            localStorage.setItem("favoritos", storable);
            this.setState({isFavorite: true});
        }
    }

    public render(){
        return (
            <div id="page" role="main">
            <article>
                <header>
                    <h2 id="title">{this.state.receta.title}</h2>
                </header>
                <div className="wrapper-video">
                    <iframe 
                        id="video" width="560" height="315" allowFullScreen 
                        src={"https://www.youtube.com/embed/" + this.state.receta.videoId}>

                    </iframe>
                </div>
                <div className="descripcion">
                    <h3>PREPARACIÓN</h3>
                    <p>{this.state.receta.description}</p>
                </div>
            </article>
            <nav id="paginador">
                <button 
                    id="fav" 
                    type="button" 
                    title="Añadir/Eliminar a favoritos"
                    className={this.state.isFavorite ? "favtrue" : undefined}
                    onClick={this.onFav}></button>
                <button 
                    id="previous" type="button" title="Receta Anterior" 
                    onClick={this.onPrev}
                    disabled={(this.arrayIndex === 0) ? true : undefined}
                    className={(this.arrayIndex === 0) ? "disabled" : undefined}></button>
                <p id="contadorRecetas">Receta {this.arrayIndex + 1 + " de 144"}</p>
                <button 
                    id="next" type="button" title="Receta Siguiente"
                    onClick={this.onNext}
                    disabled={(this.arrayIndex === 143) ? true : undefined}
                    className={(this.arrayIndex === 143) ? "disabled" : undefined}></button>
                <button id="azar" 
                    type="button" title="Receta al Azar"
                    onClick={this.onAzar}></button>
            </nav>
        </div>
        );
    }
}

export default Receta;