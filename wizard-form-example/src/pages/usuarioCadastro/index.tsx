import React, { useState } from "react";
import axios from "axios";
import {
  Field,
  FormikValues,
  FormikActions,
  FieldProps,
  ErrorMessage
} from "formik";

import WizardForm from "../../components/wizardForm";
import SpinnerLocal from "../../components/spinner/spinnerLocal";

import { IUsuario } from "../../models/interfaces/usuario.interface";
import { IPageDetails } from "../../models/interfaces/wizardForm.interface";
import { ILoading } from "../../models/interfaces/loading.interface";
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
  const [loading, setLoading] = useState<ILoading>({ isLoading: false });

  async function viaCEPService(
    FormikActions: FormikActions<IUsuario>,
    cep: string
  ) {
    setLoading({ isLoading: true });
    const { data } = await axios.get<IViaCEP>(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    FormikActions.setFieldValue("cidade", data.localidade);
    FormikActions.setFieldValue("estado", data.uf);
    setLoading({ isLoading: false });
  }

  function onSubmit(
    values: FormikValues,
    actions: FormikActions<FormikValues>
  ) {
    console.log(JSON.stringify(values, null, 2));
  }

  return (
    <React.Fragment>
      {loading.isLoading && <SpinnerLocal />}
      <WizardForm
        pagesSteps={pagesSteps}
        initialValueForm={INITIAL_VALUES}
        onSubmitForm={onSubmit}
      >
        <WizardForm.Page
          validate={(values: IUsuario) => {
            const errors: Partial<IUsuario> = {};
            if (!values.nome) {
              errors.nome = "Required";
            }
            return errors;
          }}
        >
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <Field
              className="form-control"
              name="nome"
              component="input"
              type="text"
              placeholder="Nome"
              validate="Required"
            />
            <ErrorMessage name="nome" component="div" className="field-error" />
          </div>
          <div className="form-group">
            <label htmlFor="sobrenome">Sobrenome</label>
            <Field
              className="form-control"
              name="sobrenome"
              component="input"
              type="text"
              placeholder="Sobrenome"
            />
          </div>
        </WizardForm.Page>
        <WizardForm.Page>
          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <Field
              render={({ form }: FieldProps<IUsuario>) => (
                <input
                  className="form-control"
                  name="cep"
                  type="text"
                  onChange={form.handleChange}
                  onBlur={() => {
                    viaCEPService(form, form.values.cep);
                  }}
                  value={form.values.cep}
                />
              )}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade</label>
            <Field
              className="form-control"
              name="cidade"
              component="input"
              type="text"
              placeholder="Cidade"
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="estado">estado</label>
            <Field
              className="form-control"
              name="estado"
              component="input"
              type="text"
              placeholder="Estado"
              disabled
            />
          </div>
        </WizardForm.Page>
        <WizardForm.Page
          validate={(values: IUsuario) => {
            const errors: Partial<IUsuario> = {};
            if (!values.email) {
              errors.email = "Required";
            }
            return errors;
          }}
        >
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field
              className="form-control"
              name="email"
              component="input"
              type="text"
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="field-error"
            />
          </div>
          <div className="form-group">
            <label htmlFor="sobrenome">Idade</label>
            <Field
              className="form-control"
              name="idade"
              component="input"
              type="number"
              placeholder="Idade"
            />
          </div>
        </WizardForm.Page>
      </WizardForm>
    </React.Fragment>
  );
}
