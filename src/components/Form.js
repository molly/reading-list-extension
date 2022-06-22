import PropTypes from "prop-types";

import { Box } from "@mui/material";
import Fields from "./fields";

export default function Form({
  schema,
  formData,
  createFieldSetter,
  isGrouped,
}) {
  const renderField = (fieldSchema) => {
    let FieldComponent;
    let props = {
      key: fieldSchema.fieldName,
      sx: fieldSchema.sx || {},
    };

    if (fieldSchema.type === "group") {
      return (
        <Form
          schema={fieldSchema.fields}
          formData={formData}
          createFieldSetter={createFieldSetter}
          isGrouped={true}
          {...props}
        />
      );
    }

    if (isGrouped) {
      props.sx.mt = 0;
    }

    FieldComponent = Fields[fieldSchema.type];
    props.value =
      fieldSchema.fieldName in formData
        ? formData[fieldSchema.fieldName]
        : null;
    props.setField = createFieldSetter(fieldSchema.fieldName);
    props.fieldSchema = fieldSchema;

    return <FieldComponent {...props} />;
  };

  const fields = <>{schema.map((field) => renderField(field))}</>;
  if (isGrouped) {
    return (
      <Box sx={{ mt: "10px", display: "flex", alignItems: "center" }}>
        {fields}
      </Box>
    );
  }
  return fields;
}

Form.propTypes = {
  schema: PropTypes.array.isRequired,
  formData: PropTypes.object.isRequired,
  createFieldSetter: PropTypes.func.isRequired,
  isGrouped: PropTypes.bool,
};
