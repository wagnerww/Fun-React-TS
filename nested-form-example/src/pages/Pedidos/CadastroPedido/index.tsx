import React from "react";
import { navigate } from "@reach/router";
import {
  Formik,
  Form,
  Field,
  FormikValues,
  FormikActions,
  FieldArray,
  FormikProps
} from "formik";
import * as Yup from "yup";
import shortid from "shortid";

import api from "../../../services/api";

import FormikDebugger from "../../../utils/formikDebug";
import FormWrapper from "../../../components/Form/FormWrapper";
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
import FormFieldText from "../../../components/Form/FormFieldText";
import FormFieldMoney from "../../../components/Form/FormFieldMoney";

import { IPedido } from "../../../models/interface/pedido.interface";
import { IProduto } from "../../../models/interface/produto.interface";

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
    },
    button: {
      marginRight: theme.spacing(1)
    }
  })
);

const Cadastros: React.FC = () => {
  const styles = useStyles();

  const INITIAL_PRODUTO: IProduto = {
    id: shortid.generate(),
    valor: 0,
    subTotal: 0,
    quantidade: 0,
    descricao: ""
  };

  const INITIAL_VALUES: IPedido = {
    id: shortid.generate(),
    nome: "",
    email: "",
    //dataCriacao: "",
    rua: "",
    bairro: "",
    produtos: [INITIAL_PRODUTO],
    total: 0
  };

  const schemaValidation = Yup.object().shape<IPedido>({
    id: Yup.string().required("Informe o id"),
    nome: Yup.string().required("Informe o nome"),
    email: Yup.string()
      .email()
      .required("Informe o email"),
    //  dataCriacao: Yup.string().required("Informe a  data"),
    rua: Yup.string().required("Informe o seu endereco"),
    total: Yup.number().required("Pedido sem valor"),
    produtos: Yup.array().of(
      Yup.object().shape<IProduto>({
        id: Yup.string().required("Informe o id"),
        descricao: Yup.string().required("Informe a descricao"),
        quantidade: Yup.number().required("Informe a quantidade"),
        valor: Yup.number().required("Informe o valor"),
        subTotal: Yup.number().required("Informe o subtotal")
      })
    )
  });

  async function handleSubmit(
    values: FormikValues,
    actions: FormikActions<FormikValues>
  ) {
    try {
      const response = await api.post("/pedidos", values);
      console.log("response ", response);
    } catch (error) {
      console.log("error ", error);
    }
    actions.setSubmitting(false);
    /* setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);*/
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

  const FormLevel = ({
    values,
    isSubmitting,
    setFieldValue
  }: FormikProps<FormikValues>) => (
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
                  <TableCell>Descrição</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Qtd.</TableCell>
                  <TableCell>Sub-Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.produtos &&
                  values.produtos.length > 0 &&
                  values.produtos.map((prod: IProduto, index: number) => (
                    <TableRow key={index}>
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
                color="secondary"
                onClick={() =>
                  arrayProdutos.push({
                    INITIAL_PRODUTO
                  })
                }
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
          disabled={true}
        />
      </Grid>
    </Paper>
  );

  return (
    <FormWrapper title="Criação do Pedido">
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validationSchema={schemaValidation}
        validateOnChange={true}
        render={form => {
          const { submitForm, isSubmitting } = form;
          return (
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

              <FormLevel {...form} />

              {isSubmitting && (
                <Grid item xs={12}>
                  <LinearProgress color="secondary" />
                </Grid>
              )}
              <br />
              <Grid item xs={12}>
                <Button
                  className={styles.button}
                  variant="contained"
                  disabled={isSubmitting}
                  color="primary"
                  onClick={submitForm}
                >
                  Gravar
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Voltar
                </Button>
                <FormikDebugger />
              </Grid>
            </Form>
          );
        }}
      />
    </FormWrapper>
  );
};

export default Cadastros;
