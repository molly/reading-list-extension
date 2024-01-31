import PropTypes from "prop-types";

import { Box } from "@mui/material";
import Fields from "./fields";

export default function Form({
  schema,
  tags,
  formData,
  createFieldSetter,
  isGrouped
}) {
  const renderField = (fieldSchema, index) => {
    let FieldComponent;
    let props = {
      key: fieldSchema.fieldName,
      sx: fieldSchema.sx || {}
    };
    if (index === 0) {
      props.sx.mt = "60px";
    }

    if (fieldSchema.type === "group") {
      return (
        <Form
          schema={fieldSchema.fields}
          tags={tags}
          formData={formData}
          createFieldSetter={createFieldSetter}
          isGrouped={true}
          {...props}
        />
      );
    } else if (
      fieldSchema.type.endsWith("SelectField") &&
      fieldSchema.fieldName === "tags"
    ) {
      fieldSchema.options = tags;
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

  const fields = <>{schema.map((field, index) => renderField(field, index))}</>;
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
  tags: PropTypes.object.isRequired,
  isGrouped: PropTypes.bool
};
