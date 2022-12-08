import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux'
import store from "./store";
import socketMiddleware from "./middleware/socketMiddleware";
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

