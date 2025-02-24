import { TextField as MuiTextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useValidateField } from "../../hooks/useValidateField";

const SecondaryTextField = styled(MuiTextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#EEEEEE"
    }
  }
});

export default function IntField({
  fieldSchema,
  value,
  setField,
  sx,
  ...rest
}) {
  const isValid = useValidateField(fieldSchema, value);
  const Field =
    fieldSchema.importance === "secondary" ? SecondaryTextField : MuiTextField;

  return (
    <Field
      aria-label={fieldSchema.label}
      label={fieldSchema.label}
      onChange={({ target: { value } }) => setField(value)}
      value={value || ""}
      required={fieldSchema.required}
      type="number"
      size="small"
      sx={{ mt: "10px", ...sx }}
      error={!isValid}
      {...rest}
    />
  );
}

IntField.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  setField: PropTypes.func.isRequired,
  sx: PropTypes.object
};
