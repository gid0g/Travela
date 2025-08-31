import { toast } from "react-toastify";

export const setupGlobalErrorHandlers = () => {
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);

    event.preventDefault();

    const errorMessage = extractErrorMessage(event.reason);
    toast.error(`Something went wrong: ${errorMessage}`);
  });

  window.addEventListener("error", (event) => {
    console.error("Global error:", event.error);

    if (import.meta.env.MODE === "development") {
      toast.error(`Error: ${event.message}`);
    } else {
      toast.error("Something went wrong. Please refresh the page.");
    }
  });

  window.addEventListener("error", (event) => {
    if (event.error?.name === "ReactErrorBoundary") {
      console.error("React error boundary caught error:", event.error);
    }
  });
};

const extractErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  return "An unexpected error occurred";
};

setupGlobalErrorHandlers();
