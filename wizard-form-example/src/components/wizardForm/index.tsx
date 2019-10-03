import React, { useState, ReactNode, ReactElement } from "react";
import { Formik, FormikActions } from "formik";
import { IUsuario } from "../../models/interfaces/usuario.interface";
import {
  IPageDetails,
  IPage,
  TswitchPage
} from "../../models/interfaces/wizardForm.interface";

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

  function handleSubmit(values: any, bag: any) {
    const isLastPage = page.pageActual === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmitForm(values, bag);
    } else {
      bag.setTouched({});
      bag.setSubmitting(false);
    }
  }

  const CabecalhoWizard = () => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {page.pages.map(pag => (
        <div key={pag.page} style={{ padding: "10px" }}>
          {page.pageActual >= pag.page && (
            <p style={{ color: "rgb(16, 75, 146)" }}>{pag.pageDescription}</p>
          )}
          {page.pageActual < pag.page && (
            <p style={{ color: "#000" }}>{pag.pageDescription}</p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <CabecalhoWizard />
      <Formik
        initialValues={initialValueForm}
        enableReinitialize={false}
        onSubmit={handleSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {activeChildren}

            <div className="bd-example">
              {page.pageActual > 0 && (
                <button
                  className="btn btn-dark mr-2"
                  onClick={() => switchPage(TswitchPage.Previous)}
                >
                  Anterior
                </button>
              )}
              {page.pageActual < childrenLength && (
                <button
                  className="btn btn-dark mr-2"
                  onClick={() => switchPage(TswitchPage.Next)}
                >
                  Próxima
                </button>
              )}
              {page.pageActual === childrenLength && (
                <button className="btn btn-success mr-2">Finalizar</button>
              )}
            </div>
          </form>
        )}
      ></Formik>
    </div>
  );
}
