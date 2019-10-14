import React from "react";
import { FieldProps, getIn, FormikProps, FieldConfig } from "formik";
import { TextField } from "@material-ui/core";

const FormFieldText: React.FC<FieldProps> = ({ field, form, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <TextField
      fullWidth
      margin="normal"
      helperText={!!errorText}
      {...field}
      {...props}
    ></TextField>
  );
};

export default FormFieldText;
