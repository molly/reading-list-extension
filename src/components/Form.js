import PropTypes from "prop-types";

import TextField from "./TextField";
import TextArea from "./TextArea";
import DateField from "./DateField";
import DateTimeField from "./DateTimeField";
import BooleanField from "./BooleanField";

export default function Form({ schema, formData, createFieldSetter }) {
  const renderField = (fieldSchema) => {
    const fieldValue =
      fieldSchema.fieldName in formData
        ? formData[fieldSchema.fieldName]
        : null;
    const setField = createFieldSetter(fieldSchema.fieldName);

    const props = { fieldSchema, value: fieldValue, setField };
    if (fieldSchema.type === "textinput") {
      return <TextField {...props} />;
    } else if (fieldSchema.type === "textarea") {
      return <TextArea {...props} />;
    } else if (fieldSchema.type === "date") {
      return <DateField {...props} />;
    } else if (fieldSchema.type === "datetime") {
      return <DateTimeField {...props} />;
    } else if (fieldSchema.type === "boolean") {
      return <BooleanField {...props} />;
    }
    return <div>placeholder</div>;
  };

  return <>{schema.map((field) => renderField(field))}</>;
}

Form.propTypes = {
  schema: PropTypes.array.isRequired,
  formData: PropTypes.object.isRequired,
  createFieldSetter: PropTypes.func.isRequired,
};
