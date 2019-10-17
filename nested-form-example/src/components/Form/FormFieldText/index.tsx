import React from "react";
import { FieldProps, getIn } from "formik";
import { TextField } from "@material-ui/core";

const FormFieldText: React.FC<FieldProps> = ({ field, form, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <TextField
      margin="normal"
      error={!!errorText ? true : false}
      helperText={!!errorText ? errorText : ""}
      {...field}
      {...props}
    ></TextField>
  );
};

export default FormFieldText;
