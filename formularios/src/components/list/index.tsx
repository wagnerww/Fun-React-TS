import React from "react";
import { IUsuario } from "../../models/interfaces/usuario.interface";

interface IProps {
  usuarios: IUsuario[];
  handleUpdate: (event: IUsuario) => void;
}

const App: React.FC<IProps> = ({ usuarios, handleUpdate }) => {
  return (
    <div>
      {usuarios.map(usuario => (
        <p
          style={{ cursor: "pointer" }}
          onClick={() => handleUpdate(usuario)}
          key={usuario.id}
        >
          {usuario.nome}
        </p>
      ))}
    </div>
  );
};

export default App;
