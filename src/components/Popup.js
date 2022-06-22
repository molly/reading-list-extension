import { useCallback, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import Form from "./Form";
import { schemas, emptyFormData } from "../schemas";
import { copy } from "../js/utils";

export default function Popup() {
  const [collection, setCollection] = useState("shortform");
  const [formData, setFormData] = useState(copy(emptyFormData[collection]));

  const changeCollectionType = useCallback((collectionType) => {
    setFormData(copy(emptyFormData[collectionType]));
    setCollection(collectionType);
  }, []);

  const createFieldSetter = useCallback(
    (field) =>
      ({ target: { value } }) => {
        setFormData({ ...formData, [field]: value });
      },
    [formData]
  );

  const save = () => {
    console.log(formData);
  };

  return (
    <div>
      <FormControl fullWidth size="small">
        <InputLabel id="reading-list-type-label">Reading list</InputLabel>
        <Select
          labelId="reading-list-type-label"
          id="reading-list-type"
          value={collection}
          label="Reading list"
          onChange={({ target: { value } }) => changeCollectionType(value)}
        >
          <MenuItem value="shortform">Shortform</MenuItem>
          <MenuItem value="blockchain">Blockchain</MenuItem>
          <MenuItem value="press">Press</MenuItem>
        </Select>
        <Form
          schema={schemas[collection]}
          formData={formData}
          createFieldSetter={createFieldSetter}
        />
        <Button onClick={save} variant="contained" sx={{ mt: "10px" }}>
          Save
        </Button>
      </FormControl>
    </div>
  );
}
