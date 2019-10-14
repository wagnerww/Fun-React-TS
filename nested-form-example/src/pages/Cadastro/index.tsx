import React from "react";
import {
  Formik,
  Form,
  Field,
  FormikValues,
  FormikActions,
  FieldArray
} from "formik";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import FormFieldText from "../../components/Form/FormFieldText";
import FormFieldMoney from "../../components/Form/FormFieldMoney";

import { IPedido } from "../../models/interface/pedido.interface";
import { IProduto } from "../../models/interface/produto.interface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between"
    },
    textField: {
      marginRight: theme.spacing(1),
      width: 200
    }
  })
);

const Cadastros: React.FC = () => {
  const styles = useStyles();

  const INITIAL_PRODUTO: IProduto = {
    id: 0,
    valor: 0,
    subTotal: 0,
    quantidade: 0,
    descricao: ""
  };

  const INITIAL_VALUES: IPedido = {
    id: 0,
    nome: "",
    email: "",
    rua: "",
    bairro: "",
    produtos: [INITIAL_PRODUTO],
    total: 0
  };

  function handleSubmit(
    values: FormikValues,
    actions: FormikActions<FormikValues>
  ) {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  }

  return (
    <div>
      <h2>Cadastro</h2>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        render={({ submitForm, isSubmitting, values }) => (
          <Form className={styles.container}>
            <Field
              className={styles.textField}
              label="Nome"
              name="nome"
              component={FormFieldText}
              disabled={isSubmitting}
            />
            <Field
              className={styles.textField}
              label="email"
              name="email"
              component={FormFieldText}
              disabled={isSubmitting}
            />
            <Field
              className={styles.textField}
              label="Rua"
              name="rua"
              component={FormFieldText}
              disabled={isSubmitting}
            />
            <Field
              className={styles.textField}
              label="Bairro"
              name="bairro"
              component={FormFieldText}
              disabled={isSubmitting}
            />
            <FieldArray
              name="produtos"
              render={arrayProdutos => (
                <React.Fragment>
                  <Table aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Qtd.</TableCell>
                        <TableCell>Sub-Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.produtos &&
                        values.produtos.length > 0 &&
                        values.produtos.map((prod, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Field
                                className={styles.textField}
                                name={`produtos.${index}.id`}
                                component={FormFieldText}
                                disabled={isSubmitting}
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                className={styles.textField}
                                name={`produtos.${index}.descricao`}
                                component={FormFieldText}
                                disabled={isSubmitting}
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                className={styles.textField}
                                name={`produtos.${index}.valor`}
                                component={FormFieldText}
                                disabled={isSubmitting}
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                className={styles.textField}
                                name={`produtos.${index}.quantidade`}
                                component={FormFieldText}
                                disabled={isSubmitting}
                              />
                            </TableCell>
                            <TableCell>
                              <Field
                                className={styles.textField}
                                name={`produtos.${index}.subTotal`}
                                component={FormFieldText}
                                disabled={isSubmitting}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <div style={{ width: "100%" }}>
                    <Button
                      variant="contained"
                      disabled={isSubmitting}
                      color="primary"
                      onClick={() => arrayProdutos.push(INITIAL_PRODUTO)}
                    >
                      Adicionar produto
                    </Button>
                  </div>
                </React.Fragment>
              )}
            />

            <Field
              className={styles.textField}
              label="Total"
              name="total"
              component={FormFieldMoney}
              disabled={isSubmitting}
            />

            {isSubmitting && (
              <div style={{ width: "100%" }}>
                <LinearProgress color="secondary" />
              </div>
            )}
            <br />
            <div style={{ width: "100%" }}>
              <Button
                variant="contained"
                disabled={isSubmitting}
                color="primary"
                onClick={submitForm}
              >
                Primary
              </Button>
            </div>
          </Form>
        )}
      />
    </div>
  );
};

export default Cadastros;
