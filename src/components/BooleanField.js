import PropTypes from "prop-types";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function BooleanField({
  fieldSchema,
  value,
  setField,
  ...rest
}) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={value} />}
        label={fieldSchema.label}
        ariaLabel={fieldSchema.label}
        onChange={setField}
      />
    </FormGroup>
  );
}

BooleanField.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  setField: PropTypes.func.isRequired,
};
