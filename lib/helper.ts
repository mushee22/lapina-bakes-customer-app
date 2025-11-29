import { FieldErrors, FieldValues } from "react-hook-form";

export const extractErrorMessages = <T extends FieldValues>(errors: FieldErrors<T>) => {
  return Object.values(errors).map((error) => error?.message || "").join("\n");
};