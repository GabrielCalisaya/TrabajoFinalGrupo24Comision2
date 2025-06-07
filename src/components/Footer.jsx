import { Container } from 'react-bootstrap';

function Footer(){
    return(
        // Utiliza la etiqueta 'footer' de HTML5 para la semántica.
        // 'bg-dark', 'text-white', 'py-3' son clases de Bootstrap para el fondo, color de texto y padding vertical.
        // 'fixed-bottom' posiciona el footer en la parte inferior de la ventana visible.
        <footer className='bg-dark text-white py-3 fixed-bottom'>
            <Container>
                <p className='mb-1'>Trabajo Final PV 2025</p>
                <p className='mb-1'>Grupo 24</p>
                {/* <p className='mb-0'>
                    Integrantes:
                <br />
                    Juan Carrizo
                <br />
                    Gabriel Calisaya
                <br />
                    Fernando Romero
                <br />
                    Natali Suárez
                <br />
                    Juan Baca Wayar */}
                {/* </p> */}
            </Container>
        </footer>
    );
}

export default Footer;