import React from "react";

import '../estilos/footer.scss';

function Footer(){
    return(
        <footer>
            <ul id="social">
                <li className="youtube">
                    <a href="https://www.youtube.com/user/manjaresadiario" target="_blank" title="Canal en Youtube de Manjares a Diario">YouTube</a>
                </li>
                <li className="facebook">
                    <a href="https://www.facebook.com/manjaresadiario" target="_blank" title="Página en Facebook de Manjares a Diario">Facebook</a>
                </li>
                <li className="instagram">
                    <a href="https://www.instagram.com/manjaresadiario/" target="_blank" title="Página en Instagram de Manjares a Diario">Instagram</a>
                </li>
                <li className="gmas">
                    <a href="https://plus.google.com/104096050030357179393" target="_blank" title="Página en G+ de Manjares a Diario">G+</a>
                </li>    
            </ul>
            <p>&copy;afgl - 2020</p>
        </footer>
    );
}

export default Footer;