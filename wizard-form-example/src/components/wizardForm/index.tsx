import React, { useState, ReactNode, ReactElement } from "react";
import { Formik, FormikActions } from "formik";
import { IUsuario } from "../../models/interfaces/usuario.interface";
import {
  IPageDetails,
  IPage,
  TswitchPage
} from "../../models/interfaces/wizardForm";

interface TESTE {
  Page: JSX.Element;
}

interface IProps {
  children: JSX.Element[];
  initialValueForm: IUsuario;
  pagesSteps: IPageDetails[];
  onSubmitForm: Function;
}

export default function WizardForm({
  children,
  initialValueForm,
  pagesSteps,
  onSubmitForm
}: IProps): JSX.Element {
  const [page, setPage] = useState<IPage>({ pageActual: 0, pages: pagesSteps });

  function switchPage(pageSwitch: TswitchPage) {
    let { pageActual } = page;
    pageSwitch === TswitchPage.Next ? pageActual++ : pageActual--;

    setPage(state => ({ ...state, pageActual }));
  }
  const childrenLength = React.Children.toArray(children).length - 1;
  const activeChildren = React.Children.toArray(children)[page.pageActual];

  function handleSubmit(values: any, actions: any) {
    console.log("submit ", values);
    const isLastPage = page.pageActual === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmitForm(values, actions);
    } else {
      /*this.next(values);
      bag.setSubmitting(false);*/
    }
  }

  return (
    <div>
      <Formik
        initialValues={initialValueForm}
        enableReinitialize={false}
        onSubmit={handleSubmit}
        render={({
          values,
          handleSubmit,
          isSubmitting,
          handleChange,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            {activeChildren}

            <div>
              {page.pageActual > 0 && (
                <button onClick={() => switchPage(TswitchPage.Previous)}>
                  Anterior
                </button>
              )}
              {page.pageActual < childrenLength && (
                <button onClick={() => switchPage(TswitchPage.Next)}>
                  Próxima
                </button>
              )}
              {page.pageActual === childrenLength && <button>Finalizar</button>}
            </div>
          </form>
        )}
      ></Formik>
    </div>
  );
}
