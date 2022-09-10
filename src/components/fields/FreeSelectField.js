import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

const makeOptionFromValue = (option) => {
  if (typeof option === "string") {
    return {
      value: option.toLocaleLowerCase().replace("/ /g", "-"),
      text: option,
    };
  }
  return option;
};

export default function FreeSelectField({
  fieldSchema,
  value,
  setField,
  sx,
  ...rest
}) {
  const [fullValue, setFullValue] = useState(
    value || (fieldSchema.multi ? [] : "")
  );

  const handleChange = (_, newValue) => {
    let value;
    if (fieldSchema.multi) {
      value = newValue.map((val) => makeOptionFromValue(val));
      setFullValue(value);
      setField(value.map((option) => option.value));
    } else {
      value = makeOptionFromValue(newValue);
      setFullValue(value);
      setField(value.value);
    }
  };

  return (
    <Autocomplete
      onChange={handleChange}
      value={fullValue}
      getOptionLabel={(option) => option.text}
      options={fieldSchema.options}
      multiple={fieldSchema.multi}
      freeSolo={true}
      renderInput={(params) => <TextField {...params} placeholder="Tags" />}
      sx={{ mt: "10px", ...sx }}
      size="small"
      {...rest}
    />
  );
}

FreeSelectField.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  value: PropTypes.string,
  setField: PropTypes.func.isRequired,
  sx: PropTypes.object,
};
