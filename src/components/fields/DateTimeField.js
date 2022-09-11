import { useMemo } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { isIsoDate } from "../../js/utils";

export default function DateTimeField({
  fieldSchema,
  value,
  setField,
  sx,
  ...rest
}) {
  const isValid = useMemo(
    () => (!value && !fieldSchema.required) || isIsoDate(value),
    [value, fieldSchema.required]
  );

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
      {...rest}
    />
  );
}

DateTimeField.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  setField: PropTypes.func.isRequired,
  sx: PropTypes.object,
};
