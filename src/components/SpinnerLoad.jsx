import { Spinner } from "react-bootstrap"
//Esta línea importa el componente Spinner del paquete react-bootstrap. react-bootstrap

export const SpinnerLoad = ({ open }) => { //Define un componente funcional de React llamado SpinnerLoad
   //es la desestructuración de props. Indica que este componente espera recibir una prop llamada open
    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {open && (
                <Spinner  ></Spinner>
            )}

        </div>
    )
}