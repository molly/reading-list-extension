import { useMemo } from "react";
import PropTypes from "prop-types";
import { TextField as MuiTextField } from "@mui/material";

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
        multiline: true,
      };
    }
  }, [fieldSchema]);

  return (
    <MuiTextField
      aria-label={fieldSchema.label}
      label={fieldSchema.label}
      onChange={setField}
      value={value || ""}
      size="small"
      sx={{ mt: "10px", ...sx }}
      {...multilineProps}
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
