import React from 'react';
 
import '../estilos/about.scss';

interface IAboutProps{
    sinCookies: boolean
}

function About(props: IAboutProps){
    
    return (
        <div id="page" role="main">
        <article>
            <header>
                <h2 className={props.sinCookies ? "sincookies" : undefined}>Acerca de Manjares a Diario</h2>
            </header>
            <p>
                Hola! Soy Sagrario. Bienvenido/a a Manjares a Diario – Un canal 
                de recetas saludables basadas en plantas, aún no muchas porque 
                prácticamente acabo de empezar, pero irán creciendo en número 
                poco a poco. Hace poco más de un año que mi hijo y yo adoptamos 
                la dieta vegana y nuestras vidas han cambiado para mejor, 
                principalmente en cuanto a salud se refiere porque una dieta 
                basada en plantas proporciona energía suficiente y todos los 
                nutrientes que nuestro cuerpo necesita para funcionar óptimamente,
                y otra cosa también muy importante,  es una dieta libre de 
                crueldad animal!. 
                Mi meta es inspirar a otros a incluir más alimentos de origen 
                vegetal en la dieta sin sentirse privado de nada. Estas recetas 
                tienen sabor, aroma y color, son súper deliciosas y también 
                encantan a los amantes de la carne y a los niños. Go Vegan!!!
            </p>
            <div className="wrapper-photos">
                <div className="polaroid">
                    <img alt="Foto postre vegano" src="images/16.jpg"/>
                </div>
                <div className="polaroid">
                    <img alt="Foto comida vegana" src="images/17.jpg"/>
                </div>
                <div className="polaroid">
                    <img alt="Foto receta vegana" src="images/18.jpg"/>
                </div>
                <div className="polaroid">
                    <img alt="Foto receta vegana" src="images/19.jpg"/>
                </div>
            </div>
        </article>
    </div>
    );
}

export default About;