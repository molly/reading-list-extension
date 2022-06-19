import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export default function TextArea({ fieldSchema, value, setField, ...rest }) {
  return (
    <TextField
      ariaLabel={fieldSchema.label}
      label={fieldSchema.label}
      onChange={setField}
      value={value}
      size="small"
      sx={{ mt: "10px" }}
      {...rest}
    />
  );
}

TextArea.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  setField: PropTypes.func.isRequired,
};
