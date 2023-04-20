import { grey, common } from "@mui/material/colors";
import { ThemeOptions } from "@mui/material";

export const EMAIL_APP_DEFAULT_PRIMARY_COLOR = "#00695c";
export const EMAIL_APP_DEFAULT_TEXT_COLOR = common.white;

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: EMAIL_APP_DEFAULT_PRIMARY_COLOR,
      dark: "#004940",
      // light: "#99d5cf",
      contrastText: EMAIL_APP_DEFAULT_TEXT_COLOR,
    },
  },
};
