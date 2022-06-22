import PropTypes from "prop-types";

import Fields from "./fields";

export default function Form({ schema, formData, createFieldSetter }) {
  const renderField = (fieldSchema) => {
    let FieldComponent = <div>Missing component</div>;
    let props = {};

    if (fieldSchema.type === "group") {
      FieldComponent = Fields[fieldSchema.customGroup];
      const fields = Object.keys(fieldSchema.fields).reduce(
        (acc, fieldName) => {
          const subfieldSchema = fieldSchema.fields[fieldName];
          acc[subfieldSchema.fieldName] = { fieldSchema: subfieldSchema };
          acc[subfieldSchema.fieldName].value =
            subfieldSchema.fieldName in formData
              ? formData[subfieldSchema.fieldName]
              : null;
          acc[subfieldSchema.fieldName].setField = createFieldSetter(
            subfieldSchema.fieldName
          );
          return acc;
        },
        {}
      );
      props = { fields };
    } else {
      FieldComponent = Fields[fieldSchema.type];
      const fieldValue =
        fieldSchema.fieldName in formData
          ? formData[fieldSchema.fieldName]
          : null;
      const setField = createFieldSetter(fieldSchema.fieldName);
      props = { fieldSchema, value: fieldValue, setField };
    }
    if (!FieldComponent) {
      return (
        <div key="placeholder">{`Placeholder for type ${fieldSchema.type}`}</div>
      );
    }

    return (
      <FieldComponent
        key={fieldSchema.fieldName || fieldSchema.customGroup}
        {...props}
      />
    );
  };

  return <>{schema.map((field) => renderField(field))}</>;
}

Form.propTypes = {
  schema: PropTypes.array.isRequired,
  formData: PropTypes.object.isRequired,
  createFieldSetter: PropTypes.func.isRequired,
};
