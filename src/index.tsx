import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import styled from "styled-components";
import App from "./App";
import { NuiProvider } from "react-fivem-hooks";
import { createTheme } from "@mui/material";
import { themeOptions } from "./app.theme";
import { RecoilRoot } from "recoil";

const AppContainer = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  top: 0px;
  display: flex;
  flex-direction: column;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const theme = createTheme(themeOptions);

const Root = () => {
  return (
    <HashRouter>
      <React.Suspense fallback="Loading app">
        <RecoilRoot>
          <AppContainer>
            <App theme={theme} />
          </AppContainer>
        </RecoilRoot>
      </React.Suspense>
    </HashRouter>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
