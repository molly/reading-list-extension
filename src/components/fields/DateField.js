import { useMemo } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const SecondaryTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#EEEEEE",
    },
  },
});

export default function DateField({
  fieldSchema,
  value,
  setField,
  sx,
  ...rest
}) {
  const isValid = useMemo(
    () =>
      (!value && !fieldSchema.required) ||
      /^(\d{4}(-\d{2}(-\d{2})?)?)$/m.test(value),
    [value, fieldSchema.required]
  );

  const Field =
    fieldSchema.importance === "secondary" ? SecondaryTextField : TextField;

  return (
    <Field
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

DateField.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  setField: PropTypes.func.isRequired,
  sx: PropTypes.object,
};
