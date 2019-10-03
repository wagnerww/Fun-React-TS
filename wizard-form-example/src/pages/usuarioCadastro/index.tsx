import React from "react";
import WizardForm from "../../components/wizardForm";
import { IUsuario } from "../../models/interfaces/usuario.interface";
import { IPageDetails } from "../../models/interfaces/wizardForm";
import { Field, FormikValues, FormikActions, FieldProps } from "formik";

const pagesSteps: IPageDetails[] = [
  { page: 0, pageDescription: "Pagina 1" },
  { page: 0, pageDescription: "FIM" }
];

const INITIAL_VALUES: IUsuario = {
  email: "",
  idade: 0,
  nome: "",
  sobrenome: "",
  cep: ""
};

export default function UsuarioCadastro(): JSX.Element {
  function onSubmit(
    values: FormikValues,
    actions: FormikActions<FormikValues>
  ) {
    console.log(actions);
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
          render={({ form }: FieldProps<IUsuario>) => (
            <input
              name="sobrenome"
              type="text"
              onBlur={() => {
                form.setFieldValue("cep", "98910-000");
              }}
            />
          )}
        />
        <label htmlFor="cep">CEP</label>
        <Field name="cep" type="text"></Field>
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
