import React from 'react';
import { NuiProvider, useNuiEvent } from "react-fivem-hooks";
import styled from "styled-components";
import {
  Theme,
  StyledEngineProvider,
  ThemeProvider,
  Typography,
  Box,
} from "@mui/material";
import { RecoilRoot } from "recoil";
import { PhoneSnackbar } from "./snackbar/PhoneSnackbar";
import SnackbarProvider from "./snackbar/SnackbarProvider";
import { Route } from "react-router";
import { InboxPage } from "./components/views/InboxPage";
import { EmailDetailsPage } from "./components/views/EmailDetailsPage";
import Header from "./components/Header";
import { Email } from "./types/mail";
import { useEmails } from "./atoms/email-atoms";

const Container = styled.div<{ isDarkMode: any }>`
  flex: 1;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  overflow: auto;
  max-height: 100%;
  background-color: #fafafa;
  ${({ isDarkMode }) =>
    isDarkMode &&
    `
    background-color: #212121;
  `}
`;
interface AppProps {
  theme: Theme;
}

const App = (props: AppProps) => {
  const isDarkMode = props.theme.palette.mode === "dark";

  const [, setEmails] = useEmails();

  useNuiEvent<{ email: Email }>({
    event: "nerp:qb-mail:newMail",
    callback: (data) => {
      setEmails((prev) => [...prev, data.email]);
    },
  });

  return (
    <SnackbarProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={props.theme}>
          <PhoneSnackbar />
          <Container isDarkMode={isDarkMode}>
            <Header>Email</Header>
            <React.Suspense fallback={<></>}>
              <Route path="/" exact component={InboxPage} />
              <Route path="/:id" exact component={EmailDetailsPage} />
            </React.Suspense>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </SnackbarProvider>
  );
};

const WithProviders: React.FC<AppProps> = (props) => (
  <NuiProvider>
    <App {...props} />
  </NuiProvider>
);

export default WithProviders;
