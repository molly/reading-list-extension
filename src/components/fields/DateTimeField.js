import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useValidateField } from "../../hooks/useValidateField";

export default function DateTimeField({
  fieldSchema,
  value,
  setField,
  sx,
  ...rest
}) {
  const isValid = useValidateField(fieldSchema, value);
  const readOnlyProps = useMemo(() => {
    if (!("readOnly" in fieldSchema) || !fieldSchema.readOnly) {
      return {};
    } else {
      return { InputProps: { readOnly: true }, disabled: true };
    }
  }, [fieldSchema]);
  return (
    <TextField
      aria-label={fieldSchema.label}
      label={fieldSchema.label}
      onChange={({ target: { value } }) => setField(value)}
      value={value || ""}
      required={fieldSchema.required}
      size="small"
      sx={{ mt: "10px", ...sx }}
      error={!isValid}
      {...readOnlyProps}
      {...rest}
    />
  );
}

DateTimeField.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  setField: PropTypes.func.isRequired,
  sx: PropTypes.object
};
