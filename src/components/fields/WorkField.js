import PropTypes from "prop-types";
import TextField from "./TextField";
import BooleanField from "./BooleanField";
import { Box } from "@mui/material";

export default function WorkField({ fields, ...rest }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: "10px" }}>
      <TextField
        {...fields.work}
        fullWidth={false}
        sx={{ mt: 0, mr: "16px", flexGrow: 1 }}
      />
      <BooleanField {...fields.workItalics} fullWidth={false} sx={{ mt: 0 }} />
    </Box>
  );
}

WorkField.propTypes = {
  fields: PropTypes.shape({
    work: PropTypes.shape({
      fieldSchema: PropTypes.object.isRequired,
      value: PropTypes.string,
      setField: PropTypes.func.isRequired,
    }).isRequired,
    workItalics: PropTypes.shape({
      fieldSchema: PropTypes.object.isRequired,
      value: PropTypes.bool,
      setField: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};
