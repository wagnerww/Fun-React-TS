import React, { ChangeEvent, useCallback } from "react";
import {
  Formik,
  Form,
  Field,
  FormikValues,
  FormikActions,
  FieldArray
} from "formik";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  LinearProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Paper
} from "@material-ui/core";
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
      width: 300
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
    dataCriacao: "",
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

  async function generateSubTotal(
    i: number,
    setFieldValue: any,
    produtos: IProduto[]
  ) {
    produtos[i].subTotal = (produtos[i].quantidade * produtos[i].valor) | 0;

    await setFieldValue(`produtos.${i}.subTotal`, produtos[i].subTotal);

    let total: number = 0;
    await produtos.map(prod => {
      total += prod.subTotal;
    });
    setFieldValue(`total`, total);
  }

  function generateTotal(setFieldValue: any, produtos: IProduto[]) {
    console.log("produtos ", produtos);
    let total: number = 0;
    produtos.map(prod => {
      total += prod.subTotal;
    });
    setFieldValue(`total`, total);
  }

  return (
    <Grid container sm>
      <Grid item sm>
        <Paper style={{ padding: "20px" }}>
          <h2>Cadastro</h2>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            render={({
              submitForm,
              isSubmitting,
              values,
              setFieldValue,
              handleChange
            }) => (
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
                <Paper style={{ margin: "40px 15px", padding: "20px" }}>
                  <h3>Produtos</h3>
                  <FieldArray
                    name="produtos"
                    render={arrayProdutos => (
                      <React.Fragment>
                        <Table
                          size="small"
                          aria-label="a dense table"
                          style={{ marginBottom: "20px" }}
                        >
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
                                      component={FormFieldMoney}
                                      disabled={isSubmitting}
                                      onBlur={async () => {
                                        await generateSubTotal(
                                          index,
                                          setFieldValue,
                                          values.produtos
                                        );
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      name={`produtos.${index}.quantidade`}
                                      component={FormFieldText}
                                      disabled={isSubmitting}
                                      onBlur={async () => {
                                        await generateSubTotal(
                                          index,
                                          setFieldValue,
                                          values.produtos
                                        );
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Field
                                      name={`produtos.${index}.subTotal`}
                                      component={FormFieldMoney}
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
                  <Grid container direction="row" justify="flex-end">
                    <Field
                      className={styles.textField}
                      label="Total"
                      name="total"
                      component={FormFieldMoney}
                      disabled={isSubmitting}
                    />
                  </Grid>
                </Paper>

                {isSubmitting && (
                  <Grid item xs={12}>
                    <LinearProgress color="secondary" />
                  </Grid>
                )}
                <br />
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    color="primary"
                    onClick={submitForm}
                  >
                    Primary
                  </Button>
                </Grid>
              </Form>
            )}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Cadastros;
