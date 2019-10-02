import React, { useState } from "react";

import PageOne from "./page1";
import PageTwo from "./page2";

interface IPageDetails {
  page: number;
  pageDescription: string;
}

interface IPage {
  pageActual: number;
  pages: IPageDetails[];
}

enum TswitchPage {
  Next = 1,
  Previous = 2
}

const INITIAL_STATE: IPage = {
  pageActual: 1,
  pages: [
    { page: 1, pageDescription: "Pagina 1" },
    { page: 2, pageDescription: "Pagina 2" },
    { page: 3, pageDescription: "Pagina 3" },
    { page: 4, pageDescription: "Fim" }
  ]
};

export default function Wizard(): JSX.Element {
  const [page, setPage] = useState(INITIAL_STATE);

  function switchPage(pageSwitch: TswitchPage) {
    let { pageActual } = page;
    pageSwitch === TswitchPage.Next ? pageActual++ : pageActual--;

    setPage(state => ({ ...state, pageActual }));
  }

  const CabecalhoWizard = () => (
    <div style={{ display: "flex" }}>
      {page.pages.map(pag => (
        <div key={pag.page} style={{ padding: "10px" }}>
          {page.pageActual >= pag.page && (
            <p style={{ color: "#b3b3" }}>{pag.pageDescription}</p>
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

      {page.pageActual === 1 && <PageOne />}
      {page.pageActual === 2 && <PageTwo />}
      {page.pageActual > 1 && (
        <button onClick={() => switchPage(TswitchPage.Previous)}>
          Anterior
        </button>
      )}
      {page.pageActual < page.pages.length && (
        <button onClick={() => switchPage(TswitchPage.Next)}>Próxima</button>
      )}
      {page.pageActual === page.pages.length && <button>Finalizar</button>}
    </div>
  );
}
