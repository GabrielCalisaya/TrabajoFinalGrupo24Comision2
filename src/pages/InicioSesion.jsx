import { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';
import { Container, Row, Col, Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import FondoLogin from '../assets/elegant-white-background-free-vector.jpg'; // Asegúrate de que la ruta sea correcta

export const InicioSesion = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const error = useSelector(state => state.user.loginError)
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    //Obtener los estados relevanted de Redux
    const isAuthenticated = useSelector(state => state.user.isAuthenticated); // 

    // Determinamos la ruta a la cual nos va a redirigir despues del login
    const from = location.state?.from?.pathname || '/inicio';

    useEffect(() => {
        // Este useEffect se ejecuta cada vez que 'isAuthenticated' cambia.
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]); // Dependencias del useEffect

    const handleSubmit = (e) => {
        e.preventDefault();
        // solo envia email y password.
        dispatch(setUser({ usuario, password }));
        // Limpia los campos del formulario después del intento
        setUsuario('');
        setPassword('');
    };
    const ingresoInvitado = () => {
        dispatch(setUser({ usuario: 'invitado', password: '' }));
        navigate("/");
    };

    return (
        <div style={{backgroundImage: `url(${FondoLogin})`, backgroundSize: 'cover'}} >
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh'}}>
            <Row className="w-100 justify-content-center">
                <Col xs={12} md={6} lg={4} className="text-center mb-4 justify-content-center">
                <img src="/src/assets/logog24.png" alt="Logo-Grupo" className='img-fluid align-' style={{ width: '450px', height: 'auto' }}/>
                </Col>
                <Col xs={12} md={8} lg={5}> 
                    <Card className="shadow-lg border-0 p-4">
                        <Card.Body>
                            <h2 className="mb-4 text-center text-primary fw-bold">Iniciar Sesión</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formUsuario">
                                    <Form.Label>Usuario</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FaUser />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese su usuario"
                                            value={usuario}
                                            required
                                            onChange={(e) => setUsuario(e.target.value)}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FaLock />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" size="lg">
                                        Ingresar
                                    </Button>
                                </div>
                                <div className='d-grid mt-3'>
                                    <Button variant="secondary" className="btn btn-secondary" type="button" size="lg" onClick={ingresoInvitado}>
                                        INGRESAR COMO INVITADO
                                        </Button>
                                    </div>
                                {error && (
                                    <Alert variant="danger" className="mt-4 text-center">
                                        <h5>Credenciales inválidas</h5>
                                    </Alert>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    );
};