import { Spinner } from "react-bootstrap"

//Esta linea importa el componente Spinner del paquete react-bootstrap. react-bootstrap

export const SpinnerLoad = ({ open }) => { //Define un componente funcional de React llamado SpinnerLoad
    //es la desestructuracion de props. Indica que este componente espera recibir una prop llamada open
    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {open && (
                <Spinner
                animation="border"
                variant="primary"
                role="status"
                ></Spinner>
            )}
        </div>
    )
}
