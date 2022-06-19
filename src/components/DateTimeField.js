import { useMemo } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { isIsoDate } from "../js/utils";

export default function DateTimeField({
  fieldSchema,
  value,
  setField,
  ...rest
}) {
  const isValid = useMemo(() => !value || isIsoDate(value), [value]);

  return (
    <TextField
      ariaLabel={fieldSchema.label}
      label={fieldSchema.label}
      onChange={setField}
      value={value}
      size="small"
      sx={{ mt: "10px" }}
      error={!isValid}
      {...rest}
    />
  );
}

DateTimeField.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  setField: PropTypes.func.isRequired,
};
