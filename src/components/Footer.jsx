import { Container } from 'react-bootstrap';

function Footer() {
    return (
        <footer className='bg-dark text-white py-3 mt-auto'>
            <Container className='text-center'>
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
                    Juan Baca Wayar
                </p> */}
            </Container>
        </footer>
    );
}

export default Footer;
