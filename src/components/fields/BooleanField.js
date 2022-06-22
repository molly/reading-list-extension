import PropTypes from "prop-types";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function BooleanField({
  fieldSchema,
  value,
  setField,
  sx,
  ...rest
}) {
  return (
    <FormGroup sx={{ mt: "10px", ...sx }} {...rest}>
      <FormControlLabel
        control={<Checkbox checked={value} />}
        label={fieldSchema.label}
        aria-label={fieldSchema.label}
        onChange={setField}
        sx={{ mr: 0 }}
      />
    </FormGroup>
  );
}

BooleanField.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.bool,
  setField: PropTypes.func.isRequired,
  sx: PropTypes.object,
};
