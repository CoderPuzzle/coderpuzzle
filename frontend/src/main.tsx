import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/500.css";
import "@fontsource/roboto-mono/600.css";
import { Component, type ErrorInfo, type ReactNode } from "react";
import "./monaco";
import "./styles.css";
import App from "./App";

// Last-resort boundary: a render crash anywhere in the app shows a plain
// recovery screen instead of a blank page (the error still logs to console).
class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("Unhandled render error", error, info.componentStack);
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="full-page-message">
          <span aria-hidden="true">⚠️</span>
          <h1>Something went wrong</h1>
          <p>Reload the page to get back to the judge.</p>
        </main>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);

