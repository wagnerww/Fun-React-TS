import React from "react";
import { FieldProps, getIn } from "formik";
import { TextField } from "@material-ui/core";
import NumberFormat from "react-number-format";

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
  setFieldValue: (field: string, value: any) => void;
  name: string;
}

function Mask(props: TextMaskCustomProps) {
  const { inputRef, setFieldValue, name, ...rest } = props;

  return (
    <NumberFormat
      {...rest}
      getInputRef={inputRef}
      thousandSeparator="."
      isNumericString
      decimalSeparator=","
      allowedDecimalSeparators={","}
      onValueChange={values => {
        setFieldValue(name, values.floatValue);
      }}
    />
  );
}

const FormFieldMoney: React.FC<FieldProps> = ({ field, form, ...props }) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <TextField
      fullWidth
      margin="normal"
      error={!!errorText ? true : false}
      helperText={!!errorText ? errorText : ""}
      {...field}
      {...props}
      InputProps={{
        inputComponent: Mask as any,
        inputProps: { setFieldValue: form.setFieldValue }
      }}
    ></TextField>
  );
};

export default FormFieldMoney;
