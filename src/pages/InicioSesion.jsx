import { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';
import { Container, Row, Col, Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';

export const InicioSesion = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const error = useSelector(state => state.user.loginError)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Obtener los estados relevanted de Redux
    const isAuthenticated = useSelector(state => state.user.isAuthenticated); // 

    // Determinamos la ruta a la cual nos va a redirigir despues del login
    const from = location.state?.from?.pathname || '/inicio';

    useEffect(() => {
        // Este useEffect se ejecuta cada vez que 'isAuthenticated' cambia.
        console.log("Estado de autenticación actual en useEffect:", isAuthenticated);
        if (isAuthenticated) {
            console.log("Usuario autenticado, redirigiendo a:", from);
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]); // Dependencias del useEffect

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Intentando iniciar sesión con:", { email, password });

        // ¡IMPORTANTE!: Solo envía email y password.
        // El reducer 'setUser' en userSlice.js tiene la lógica de validación
        // y establecerá 'isAuthenticated' y 'loginError' basado en esas credenciales.
        dispatch(setUser({ email, password }));

        // No necesitamos lógica condicional aquí para el dispatch de setUser,
        // ya que el userSlice.js lo maneja internamente.
        // Los console.log del useEffect nos dirán si isAuthenticated cambió.

        // Limpia los campos del formulario después del intento
        setEmail('');
        setPassword('');
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100 justify-content-center">
                <Col xs={12} md={8} lg={5}>
                    <Card className="shadow-lg border-0 p-4">
                        <Card.Body>
                            <h2 className="mb-4 text-center text-primary fw-bold">Iniciar Sesión</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FaUser />
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
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
    );
};