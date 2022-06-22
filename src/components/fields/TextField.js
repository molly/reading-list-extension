import PropTypes from "prop-types";
import { TextField as MuiTextField } from "@mui/material";

export default function TextField({
  fieldSchema,
  value,
  setField,
  sx,
  ...rest
}) {
  return (
    <MuiTextField
      aria-label={fieldSchema.label}
      label={fieldSchema.label}
      onChange={setField}
      value={value || ""}
      size="small"
      sx={{ mt: "10px", ...sx }}
      {...rest}
    />
  );
}

TextField.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  setField: PropTypes.func.isRequired,
  sx: PropTypes.object,
};
