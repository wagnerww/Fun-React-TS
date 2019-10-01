import React, { useState, ChangeEvent, FormEvent } from "react";

import List from "../list";

import { IUsuario } from "../../models/interfaces/usuario.interface";

interface IUsuarios {
  usuarios: IUsuario[];
}

const INITIAL_VALUES: IUsuario = {
  id: 0,
  email: "",
  nome: "",
  telefone: "",
  idade: 0
};

// Auto-incremento
let id: number = 0;

const Formulario: React.FC = () => {
  // Controle de listagem
  const [users, setUsers] = useState<IUsuarios>({ usuarios: [] });

  // Formulario de controle
  const [user, setUser] = useState<IUsuario>(INITIAL_VALUES);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setUser(state => ({ ...state, [name]: value }));
  }

  async function handleSubmit(f: FormEvent<HTMLFormElement>) {
    f.preventDefault();
    const userInsert = user;
    if (user.id === 0) {
      id++;
      userInsert.id = id;
      setUsers(state => ({ usuarios: [...state.usuarios, userInsert] }));
    } else {
      const { usuarios } = users;
      const iUser = await usuarios.findIndex(usuario => usuario.id === user.id);
      usuarios[iUser] = user;

      setUsers({ usuarios });
    }
    setUser(INITIAL_VALUES);
  }

  function handleUpdate(user: IUsuario) {
    setUser(user);
  }

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={user.email}
        />
        <label htmlFor="">Nome</label>
        <input
          type="text"
          name="nome"
          onChange={handleChange}
          value={user.nome}
        />
        <label htmlFor="">Telefone</label>
        <input
          type="text"
          name="telefone"
          onChange={handleChange}
          value={user.telefone}
        />
        <label htmlFor="">Idade</label>
        <input
          type="number"
          name="idade"
          onChange={handleChange}
          value={user.idade}
        />
        <button type="submit">Submit</button>
      </form>
      <List usuarios={users.usuarios} handleUpdate={handleUpdate} />
    </div>
  );
};

export default Formulario;
