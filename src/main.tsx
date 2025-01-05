import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryCient";
import { persistor, store } from "./store";
import { AdminProvider } from "./pages/Admin/context/AdminContext";
import Loader from "./container/Loader";
import ErrorBoundry from "./ErrorBoundry";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundry>
      <Router>
        <Provider store={store}>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <AdminProvider>
                <Routes>
                  <Route path="/*" element={<App />} />
                </Routes>
              </AdminProvider>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </Router>
    </ErrorBoundry>
  </React.StrictMode>
);
