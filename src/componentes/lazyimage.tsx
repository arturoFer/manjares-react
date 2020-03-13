import React from 'react';

interface ILazyImageProps{
    posicion: number,
    observer: IntersectionObserver
}

class LazyImage extends React.Component<ILazyImageProps, {}>{

    private lazyImage: React.RefObject<HTMLImageElement>;
    
    constructor(props: ILazyImageProps) {
        super(props);
        this.lazyImage = React.createRef();
    }

    public componentDidMount(){
        this.props.observer.observe(this.lazyImage.current as HTMLImageElement);
    }

    public render() {
        return <img 
            alt={"Foto Receta " + this.props.posicion}
            data-src={"images/" + this.props.posicion + ".jpg"} 
            src="images/preload.jpg" 
            ref={this.lazyImage}/>;
    }
    
}

export default LazyImage;