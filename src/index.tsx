import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Provider } from 'react-redux';
import {store} from "./app/store";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        children: [
            {
                path: "login",
                element: <LoginForm />,
            },
        ],
    },
]);
root.render(
  <React.StrictMode>
      <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
