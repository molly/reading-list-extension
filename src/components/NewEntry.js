import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  Stack
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

import Form from "./Form";
import { SCHEMAS, EMPTY_FORM_DATA } from "../schemas";
import { copy } from "../js/utils";
import { filterPrefillData, getPrefillData, getTags } from "../js/prefill";
import { validate } from "../schemas/validate";

import { addEntry } from "../api/entry";
import { signout } from "../api/auth";

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

  const [collection, setCollection] = useState("shortform");
  const [formData, setFormData] = useState(null);

  const [saveStatus, setSaveStatus] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    // Set once per load
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
              : collection === "blockchain"
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
              <MenuItem value="blockchain">Blockchain</MenuItem>
              <MenuItem value="press">Press</MenuItem>
            </OnDarkSelect>
            <OnDarkButton variant="outlined" onClick={handleSignout}>
              Sign out
            </OnDarkButton>
          </Toolbar>
        </AppBar>
        <Form
          schema={SCHEMAS[collection]}
          tags={allTags[collection]}
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
