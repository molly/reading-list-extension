import { useMemo } from "react";
import PropTypes from "prop-types";
import { TextareaAutosize } from "@mui/material";

export default function TextArea({
  fieldSchema,
  value,
  setField,
  style,
  ...rest
}) {
  const rows = useMemo(
    () => ("rows" in fieldSchema ? fieldSchema.rows : 1),
    [fieldSchema]
  );

  return (
    <TextareaAutosize
      aria-label={fieldSchema.label}
      label={fieldSchema.label}
      placeholder={fieldSchema.label}
      value={value || ""}
      onChange={setField}
      minRows={rows}
      maxRows={rows * 2}
      style={{ marginTop: "10px", ...style }}
      {...rest}
    />
  );
}

TextArea.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  setField: PropTypes.func.isRequired,
  style: PropTypes.object,
};
