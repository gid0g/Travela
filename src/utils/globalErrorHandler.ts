import { toast } from "react-toastify";

export const setupGlobalErrorHandlers = () => {
  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);

    // Prevent the default browser behavior
    event.preventDefault();

    // Show user-friendly error message
    const errorMessage = extractErrorMessage(event.reason);
    toast.error(`Something went wrong: ${errorMessage}`);
  });

  // Handle global JavaScript errors
  window.addEventListener("error", (event) => {
    console.error("Global error:", event.error);

    // Show user-friendly error message in development
    if (import.meta.env.MODE === "development") {
      toast.error(`Error: ${event.message}`);
    } else {
      toast.error("Something went wrong. Please refresh the page.");
    }
  });

  // Handle React error boundary fallback
  window.addEventListener("error", (event) => {
    // If it's a React error, we might want to redirect to error page
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

// Setup error handlers when this module is imported
setupGlobalErrorHandlers();
