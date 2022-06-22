import { useCallback, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import Form from "./Form";
import { schemas, emptyFormData } from "../schemas";
import { copy } from "../js/utils";

export default function Popup() {
  const [collection, setCollection] = useState("shortform");
  const [formData, setFormData] = useState(copy(emptyFormData[collection]));

  const changeCollectionType = useCallback((collectionType) => {
    setCollection(collectionType);
    setFormData(copy(emptyFormData[collectionType]));
  }, []);

  const createFieldSetter = useCallback(
    (field) =>
      ({ target: { value } }) => {
        setFormData({ ...formData, [field]: value });
      },
    [formData]
  );

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
      </FormControl>
    </div>
  );
}
