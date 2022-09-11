import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useValidateField } from "../../hooks/useValidateField";

export default function SelectField({
  fieldSchema,
  value,
  setField,
  sx,
  ...rest
}) {
  const isValid = useValidateField(fieldSchema, value);

  return (
    <FormControl sx={{ mt: "10px", ...sx }} size="small">
      <InputLabel id={`${fieldSchema.fieldName}-select-label`}>
        {fieldSchema.label}
      </InputLabel>
      <Select
        labelId={`${fieldSchema.fieldName}-select-label`}
        label={fieldSchema.label}
        onChange={({ target: { value } }) => setField(value)}
        value={value || (fieldSchema.multi ? [] : "")}
        multiple={fieldSchema.multi}
        required={fieldSchema.required}
        MenuProps={{
          sx: { maxHeight: "400px" },
          MenuListProps: { dense: true },
        }}
        autoWidth={true}
        error={!isValid}
        {...rest}
      >
        {fieldSchema.options.map((option) => (
          <MenuItem value={option.value} key={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SelectField.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  setField: PropTypes.func.isRequired,
  sx: PropTypes.object,
};
