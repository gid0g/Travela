import { toast } from "react-toastify";

export interface SafeAsyncOptions {
  showToast?: boolean;
  logError?: boolean;
  fallbackMessage?: string;
  onError?: (error: unknown) => void;
}

export const safeAsync = async <T>(
  asyncFn: () => Promise<T>,
  options: SafeAsyncOptions = {}
): Promise<T | null> => {
  const {
    showToast = true,
    logError = true,
    fallbackMessage = "An unexpected error occurred",
    onError,
  } = options;

  try {
    return await asyncFn();
  } catch (error) {
    if (logError) {
      console.error("Safe async error:", error);
    }

    const errorMessage = extractErrorMessage(error, fallbackMessage);

    if (showToast) {
      toast.error(errorMessage);
    }

    if (onError) {
      onError(error);
    }

    return null;
  }
};

export const extractErrorMessage = (
  error: unknown,
  fallback: string = "An error occurred"
): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  if (error && typeof error === "object" && "detail" in error) {
    return String(error.detail);
  }

  return fallback;
};

export const isNetworkError = (error: unknown): boolean => {
  if (error && typeof error === "object" && "code" in error) {
    return error.code === "NETWORK_ERROR" || error.code === "ERR_NETWORK";
  }
  return false;
};

export const isAuthError = (error: unknown): boolean => {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as any).response;
    return response?.status === 401 || response?.status === 403;
  }
  return false;
};

export const handleComponentError = (error: unknown, componentName: string) => {
  console.error(`Error in ${componentName}:`, error);

  if (import.meta.env.MODE === "development") {
    // In development, show more detailed errors
    toast.error(`Error in ${componentName}: ${extractErrorMessage(error)}`);
  } else {
    // In production, show generic error
    toast.error("Something went wrong. Please try again.");
  }
};
