import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./utilities/store.js";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
);
