import PropTypes from "prop-types";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useValidateField } from "../../hooks/useValidateField";

export default function BooleanField({
  fieldSchema,
  value,
  setField,
  sx,
  ...rest
}) {
  const isValid = useValidateField(fieldSchema, value);

  return (
    <FormGroup sx={{ mt: "10px", ...sx }} {...rest}>
      <FormControlLabel
        control={<Checkbox checked={value} />}
        label={fieldSchema.label}
        aria-label={fieldSchema.label}
        onChange={({ target }) => setField(target.checked)}
        sx={{ mr: 0 }}
        error={!isValid}
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
