import { useMemo } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export default function DateField({
  fieldSchema,
  value,
  setField,
  sx,
  ...rest
}) {
  const isValid = useMemo(
    () => !value || /^(\d{4}(-\d{2}(-\d{2})?)?)?$/m.test(value),
    [value]
  );

  return (
    <TextField
      aria-label={fieldSchema.label}
      label={fieldSchema.label}
      onChange={setField}
      value={value || ""}
      size="small"
      sx={{ mt: "10px", ...sx }}
      error={!isValid}
      {...rest}
    />
  );
}

DateField.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  setField: PropTypes.func.isRequired,
  sx: PropTypes.object,
};
