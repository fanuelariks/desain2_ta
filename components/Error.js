import FormHelperText from "@mui/material/FormHelperText";
import { red } from "@mui/material/colors";

const GetErrorMessage = (type) => {
  console.log(type);
  switch (type) {
    case "minlength":
      return "Minimal 8 karakter";
    case "validate":
      return "Password tidak sesuai";
    case "required":
    default:
      return "Mohon mengisi secara lengkap";
  }
};

const FormError = ({ error }) => {
  if (!error) {
    return <></>;
  }

  const { type } = error;
  const message = GetErrorMessage(type);

  return (
    <FormHelperText sx={{ color: red[500], m: 0 }}>{message}</FormHelperText>
  );
};

export default FormError;
