import { useCallback } from "react";
import { toast } from "react-toastify";

interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  fallbackMessage?: string;
}

export const useErrorHandler = () => {
  const handleError = useCallback(
    (error: unknown, options: ErrorHandlerOptions = {}) => {
      const {
        showToast = true,
        logError = true,
        fallbackMessage = "An unexpected error occurred",
      } = options;

      let errorMessage = fallbackMessage;

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String(error.message);
      }

      if (logError) {
        console.error("Error occurred:", error);
      }

      if (showToast) {
        toast.error(errorMessage);
      }

      return errorMessage;
    },
    []
  );

  const handleAsyncError = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      options: ErrorHandlerOptions = {}
    ): Promise<T | null> => {
      try {
        return await asyncFn();
      } catch (error) {
        handleError(error, options);
        return null;
      }
    },
    [handleError]
  );

  return {
    handleError,
    handleAsyncError,
  };
};
