import { useMemo } from "react";
import PropTypes from "prop-types";
import { TextField as MuiTextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useValidateField } from "../../hooks/useValidateField";

const SecondaryTextField = styled(MuiTextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#EEEEEE"
    }
  }
});

export default function TextField({
  fieldSchema,
  value,
  setField,
  sx,
  ...rest
}) {
  const multilineProps = useMemo(() => {
    if (!("rows" in fieldSchema)) {
      return {};
    } else {
      return {
        minRows: fieldSchema.rows,
        maxRows: fieldSchema.rows * 2,
        multiline: true
      };
    }
  }, [fieldSchema]);

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
      size="small"
      sx={{ mt: "10px", ...sx }}
      error={!isValid}
      {...multilineProps}
      {...rest}
    />
  );
}

TextField.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  setField: PropTypes.func.isRequired,
  sx: PropTypes.object
};
