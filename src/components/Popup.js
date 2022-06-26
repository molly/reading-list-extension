import { useCallback, useEffect, useState, useMemo } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import Form from "./Form";
import { SCHEMAS, EMPTY_FORM_DATA } from "../schemas";
import { copy } from "../js/utils";
import { filterPrefillData, getPrefillData, getTags } from "../js/prefill";

export default function Popup() {
  // Set once per load
  const [prefillData, setPrefillData] = useState(null);
  const [allTags, setAllTags] = useState(null);

  const [collection, setCollection] = useState("shortform");
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const initialFormData = copy(EMPTY_FORM_DATA[collection]);
    getPrefillData().then((data) => {
      setPrefillData(data);
      const filteredPrefillData = filterPrefillData(data, collection);
      setFormData({ ...initialFormData, ...filteredPrefillData });
    });
    getTags().then((data) => {
      setAllTags(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateEmptyDataOnCollectionChange = useCallback(
    (collectionType) => {
      const initialFormData = copy(EMPTY_FORM_DATA[collectionType]);
      const filteredPrefillData = filterPrefillData(
        prefillData,
        collectionType
      );
      setFormData({ ...initialFormData, ...filteredPrefillData });
    },
    [prefillData]
  );

  const changeCollectionType = useCallback(
    (collectionType) => {
      setCollection(collectionType);
      updateEmptyDataOnCollectionChange(collectionType);
    },
    [updateEmptyDataOnCollectionChange]
  );

  console.log(formData);
  const createFieldSetter = useCallback(
    (field) => (value) => {
      setFormData((previousFormData) => ({
        ...previousFormData,
        [field]: value,
      }));
    },
    []
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
          MenuProps={{ MenuListProps: { dense: true } }}
          onChange={({ target: { value } }) => changeCollectionType(value)}
        >
          <MenuItem value="shortform">Shortform</MenuItem>
          <MenuItem value="blockchain">Blockchain</MenuItem>
          <MenuItem value="press">Press</MenuItem>
        </Select>
        {formData && allTags && (
          <Form
            schema={SCHEMAS[collection]}
            tags={allTags[collection]}
            formData={formData}
            createFieldSetter={createFieldSetter}
          />
        )}
        <Button onClick={save} variant="contained" sx={{ mt: "10px" }}>
          Save
        </Button>
      </FormControl>
    </div>
  );
}
