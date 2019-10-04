import React, { useState, ReactNode, ReactElement, ReactChildren } from "react";
import { Formik, ErrorMessage } from "formik";
import { IUsuario } from "../../models/interfaces/usuario.interface";
import {
  IPageDetails,
  IPage,
  TswitchPage
} from "../../models/interfaces/wizardForm.interface";

import DebugFormik from "../../utils/debugFormik";

interface IProps {
  children: JSX.Element[];
  initialValueForm: IUsuario;
  pagesSteps: IPageDetails[];
  onSubmitForm: Function;
}

type PageProps = {
  validate?(values: IUsuario): any;
};

function Page(props: any): JSX.Element {
  return props.children;
}

function WizardForm({
  children,
  initialValueForm,
  pagesSteps,
  onSubmitForm
}: IProps): JSX.Element {
  const [page, setPage] = useState<IPage>({ pageActual: 0, pages: pagesSteps });
  const childrenLength = React.Children.toArray(children).length - 1;
  const activeChildren = React.Children.toArray(children)[page.pageActual];

  function switchPage(pageSwitch: TswitchPage) {
    let { pageActual } = page;
    pageSwitch === TswitchPage.Next ? pageActual++ : pageActual--;

    setPage(state => ({ ...state, pageActual }));
  }

  function handleValidate(values: IUsuario) {
    const activePage = React.Children.toArray(children)[page.pageActual];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  }

  function handleSubmit(values: IUsuario, bag: any) {
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
        validate={handleValidate}
        render={({ handleSubmit, isValid }) => (
          <form onSubmit={handleSubmit}>
            {activeChildren}

            <div className="bd-example">
              {page.pageActual > 0 && (
                <button
                  className="btn btn-dark mr-2"
                  onClick={() =>
                    isValid ? switchPage(TswitchPage.Previous) : null
                  }
                >
                  Anterior
                </button>
              )}
              {page.pageActual < childrenLength && (
                <button
                  className="btn btn-dark mr-2"
                  onClick={() =>
                    isValid ? switchPage(TswitchPage.Next) : null
                  }
                >
                  Próxima
                </button>
              )}
              {page.pageActual === childrenLength && (
                <button className="btn btn-success mr-2">Finalizar</button>
              )}
            </div>
            <DebugFormik />
          </form>
        )}
      ></Formik>
    </div>
  );
}

WizardForm.Page = Page;
export default WizardForm;
