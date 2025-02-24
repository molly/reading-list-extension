import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback, useEffect, useMemo, useState } from "react";

import { filterPrefillData, getPrefillData, getTags } from "../js/prefill";
import { copy } from "../js/utils";
import { EMPTY_FORM_DATA, SCHEMAS } from "../schemas";
import { validate } from "../schemas/validate";
import Form from "./Form";

import { signout } from "../api/auth";
import { addEntry } from "../api/entry";

const OnDarkSelect = styled(Select)({
  "& .MuiSelect-select": {
    color: "#FFFFFF"
  },
  "& .MuiSvgIcon-root": {
    color: "#FFFFFF"
  }
});

const OnDarkButton = styled(Button)({
  color: "#FFFFFF",
  borderColor: "#FFFFFF"
});

export default function NewEntry({ setIsLoggedIn }) {
  const [prefillData, setPrefillData] = useState(null);
  const [allTags, setAllTags] = useState(null);

  const [bookTags, setBookTags] = useState(null);
  const [collection, setCollection] = useState("shortform");
  const [formData, setFormData] = useState(null);

  const [saveStatus, setSaveStatus] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    // Set once per load
    let initialFormData = copy(EMPTY_FORM_DATA[collection]);
    setFormData(EMPTY_FORM_DATA);
    getPrefillData().then((data) => {
      let _collection = "shortform";
      if (data.collection === "book") {
        _collection = "book";
        setCollection("book");
        initialFormData = copy(EMPTY_FORM_DATA["book"]);
      }
      setPrefillData(data);
      const filteredPrefillData = filterPrefillData(data, _collection);
      setFormData({ ...initialFormData, ...filteredPrefillData });
    });
    getTags().then((data) => {
      setAllTags(data.tags);
      setBookTags(data.bookTags);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Clear error on field change to allow fix & resubmit
    if (saveError) {
      setSaveError(null);
      setSaveStatus(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const updateEmptyDataOnCollectionChange = useCallback(
    (collectionType) => {
      const initialFormData = copy(EMPTY_FORM_DATA[collectionType]);
      const filteredPrefillData = filterPrefillData(
        { ...prefillData, ...formData },
        collectionType
      );
      setFormData({ ...initialFormData, ...filteredPrefillData });
    },
    [prefillData, formData]
  );

  const changeCollectionType = useCallback(
    (collectionType) => {
      setCollection(collectionType);
      updateEmptyDataOnCollectionChange(collectionType);
    },
    [updateEmptyDataOnCollectionChange]
  );

  const createFieldSetter = useCallback(
    (field) => (value) => {
      setFormData((previousFormData) => ({
        ...previousFormData,
        [field]: value
      }));
    },
    []
  );

  const isLoading = useMemo(() => !formData || !allTags, [formData, allTags]);

  const isValid = useMemo(
    () => validate(formData, SCHEMAS[collection]),
    [formData, collection]
  );

  const save = async () => {
    setSaveStatus("loading");

    // Remove empty values
    const filteredData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] || formData[key] === false) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    const { error } = await addEntry(collection, filteredData);
    if (error) {
      if (error.status === 401) {
        setIsLoggedIn(false);
      } else {
        setSaveStatus("error");
        setSaveError(error.message);
      }
    } else {
      setSaveStatus("success");
    }
  };

  const handleSignout = async () => {
    const resp = await signout();
    if (!resp.error) {
      setIsLoggedIn(false);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "600px",
          width: "100%"
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else if (saveStatus === "success") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "600px",
          width: "100%",
          backgroundColor: "primary.dark"
        }}
      >
        <Stack alignItems="center" spacing={1}>
          <img
            src="/build/images/saved.gif"
            alt="Animated GIF of a woman sitting at a computer amid stacks of books, giving a thumbs up"
            width="300px"
          />
          <Typography variant="h5" sx={{ color: "#FFFFFF" }}>
            Added to the stack!
          </Typography>
        </Stack>
      </Box>
    );
  }
  return (
    <Box sx={{ margin: 2 }}>
      <FormControl fullWidth size="small">
        <AppBar
          color={
            collection === "shortform"
              ? "primary"
              : collection === "book"
                ? "secondary"
                : "success"
          }
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <OnDarkSelect
              labelId="reading-list-type-label"
              id="reading-list-type"
              value={collection}
              label="Reading list"
              MenuProps={{ MenuListProps: { dense: true } }}
              onChange={({ target: { value } }) => changeCollectionType(value)}
              variant="standard"
              disableUnderline={true}
            >
              <MenuItem value="shortform">Shortform</MenuItem>
              <MenuItem value="book">Book</MenuItem>
              <MenuItem value="press">Press</MenuItem>
            </OnDarkSelect>
            <OnDarkButton variant="outlined" onClick={handleSignout}>
              Sign out
            </OnDarkButton>
          </Toolbar>
        </AppBar>
        <Form
          schema={SCHEMAS[collection]}
          collection={collection}
          tags={allTags}
          bookTags={bookTags}
          formData={formData}
          createFieldSetter={createFieldSetter}
        />
        {!!saveError && (
          <Alert severity="error" sx={{ mt: "10px" }}>
            {saveError}
          </Alert>
        )}
        <LoadingButton
          onClick={save}
          variant="contained"
          sx={{ mt: "10px" }}
          loading={saveStatus === "loading"}
          disabled={!isValid || saveStatus !== null}
          endIcon={<SaveIcon />}
        >
          Save
        </LoadingButton>
      </FormControl>
    </Box>
  );
}

NewEntry.propTypes = {};
