import React from "react";
import axios from "axios";
import { Field, FormikValues, FormikActions, FieldProps } from "formik";

import WizardForm from "../../components/wizardForm";

import { IUsuario } from "../../models/interfaces/usuario.interface";
import { IPageDetails } from "../../models/interfaces/wizardForm.interface";
import { IViaCEP } from "../../models/interfaces/viacep.interface";

const pagesSteps: IPageDetails[] = [
  { page: 0, pageDescription: "Dados Básicos" },
  { page: 1, pageDescription: "Endereço" },
  { page: 2, pageDescription: "FIM" }
];

const INITIAL_VALUES: IUsuario = {
  email: "",
  idade: 0,
  nome: "",
  sobrenome: "",
  cep: "",
  cidade: "",
  estado: ""
};

export default function UsuarioCadastro(): JSX.Element {
  async function viaCEPService(
    FormikActions: FormikActions<IUsuario>,
    cep: string
  ) {
    const { data } = await axios.get<IViaCEP>(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    FormikActions.setFieldValue("cidade", data.localidade);
    FormikActions.setFieldValue("estado", data.uf);
  }

  function onSubmit(
    values: FormikValues,
    actions: FormikActions<FormikValues>
  ) {
    console.log(JSON.stringify(values, null, 2));
  }

  return (
    <WizardForm
      pagesSteps={pagesSteps}
      initialValueForm={INITIAL_VALUES}
      onSubmitForm={onSubmit}
    >
      <div>
        <label htmlFor="nome">Nome</label>
        <Field name="nome" component="input" type="text" placeholder="Nome" />
        <label htmlFor="sobrenome">Sobrenome</label>
        <Field
          name="sobrenome"
          component="input"
          type="text"
          placeholder="Sobrenome"
        />
      </div>
      <div>
        <label htmlFor="cep">CEP</label>
        <Field
          render={({ form }: FieldProps<IUsuario>) => (
            <input
              name="cep"
              type="text"
              onChange={form.handleChange}
              onBlur={() => {
                viaCEPService(form, form.values.cep);
              }}
            />
          )}
        />
        <label htmlFor="cidade">Cidade</label>
        <Field
          name="cidade"
          component="input"
          type="text"
          placeholder="Cidade"
        />
        <label htmlFor="estado">estado</label>
        <Field
          name="estado"
          component="input"
          type="text"
          placeholder="Estado"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="text" placeholder="Email" />
        <label htmlFor="sobrenome">Idade</label>
        <Field
          name="idade"
          component="input"
          type="number"
          placeholder="Idade"
        />
      </div>
    </WizardForm>
  );
}
