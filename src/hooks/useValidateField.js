import { useMemo } from "react";
import { makeFieldValidator } from "../schemas/validate";

export function useValidateField(fieldSchema, value) {
  const validator = makeFieldValidator(fieldSchema);
  const isValid = useMemo(() => validator(value), [validator, value]);
  return isValid;
}
