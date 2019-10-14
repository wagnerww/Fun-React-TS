import React from "react";
import { FieldProps, getIn, FormikProps, FieldConfig } from "formik";
import { TextField } from "@material-ui/core";
import InputMask from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function Mask(props: TextMaskCustomProps) {
  const numberMask = createNumberMask({
    prefix: "",
    suffix: "",
    allowDecimal: true
  });

  const { inputRef, ...rest } = props;
  return (
    <InputMask
      {...rest}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={numberMask}
      placeholderChar={"\u2000"}
      showMask
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
      helperText={!!errorText}
      {...field}
      {...props}
      InputProps={{
        inputComponent: Mask as any
      }}
    ></TextField>
  );
};

export default FormFieldMoney;
