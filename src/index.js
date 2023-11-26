import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from "react";
import ReactDOM from "react-dom";
import "@fontsource/source-sans-pro";

import App from "./App";

import AddAccountAdmin from './pages/acount/AddAccountAdmin';

import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');
const rootInstance = createRoot(root);
rootInstance.render(<App />);
//ReactDOM.render(<App />, document.getElementById("root"));
