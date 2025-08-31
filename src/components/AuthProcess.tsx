import React, { useState } from "react";
import type { AuthFormData, AuthAppProps } from "../types/auth.types";
import { signupFields, loginFields } from "../data/data";
import { FormField, InputField } from "./Forms";
import { z } from "zod";

const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface AuthFormProps {
  title: string;
  fields: any[];
  submitButtonText: string;
  onSubmit: (data: AuthFormData) => Promise<void>;
  footerLinks?: {
    primary?: { text: string; onClick: () => void };
    secondary?: { text: string; onClick: () => void };
  };
  isLoading?: boolean;
  error?: string;
  schema: z.ZodSchema;
}

function AuthForm({
  title,
  fields,
  submitButtonText,
  onSubmit,
  footerLinks,
  isLoading ,
  error,
  schema,
}: AuthFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({});
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      schema.parse(formData);
      await onSubmit(formData);
      setFormData({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: { [key: string]: string } = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0] as string] = issue.message;
          }
        });
        console.log("Validation errors:", errors);
        setFieldErrors(errors);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12">
          <div
            className="card border-0 shadow-sm bg-transparent"
            style={{ borderRadius: "16px" }}
          >
            <div className="card-body p-4 p-sm-5">
              <h1 className="h1 fw-bold text-dark mb-4 text-center text-sm-start">
                {title}
              </h1>

              {error && (
                <div className="alert alert-danger py-2 mb-3" role="alert">
                  <small>{error}</small>
                </div>
              )}

              <div onKeyDown={handleKeyPress}>
                {fields.map((field) => (
                  <FormField
                    label={field?.label}
                    className="mb-4"
                    key={field.name}
                  >
                    <InputField
                      placeholder={field?.placeholder || field?.label}
                      value={formData[field.name] || ""}
                      onChange={(value) => handleInputChange(field.name, value)}
                      type={field?.type || "text"}
                    />
                    {fieldErrors[field.name] && (
                      <div className="invalid-feedback d-block">
                        <small>{fieldErrors[field.name]}</small>
                      </div>
                    )}
                  </FormField>
                ))}

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="btn btn-dark btn-lg w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    borderRadius: "8px",
                    fontWeight: "500",
                    height: "50px",
                  }}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </>
                  ) : (
                    <>
                      {submitButtonText}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {footerLinks && (
                <div className="text-center mt-4">
                  {footerLinks.primary && (
                    <p className="mb-2">
                      <button
                        type="button"
                        className="btn btn-link p-0 text-muted text-decoration-none small"
                        onClick={footerLinks.primary.onClick}
                        style={{ fontSize: "14px" }}
                      >
                        {footerLinks.primary.text}
                      </button>
                    </p>
                  )}
                  {footerLinks.secondary && (
                    <p className="mb-0 text-muted small">
                      {footerLinks.secondary.text
                        .split(" ")
                        .slice(0, -2)
                        .join(" ")}{" "}
                      <button
                        type="button"
                        className="btn btn-link p-0 text-dark text-decoration-underline fw-medium small"
                        onClick={footerLinks.secondary.onClick}
                        style={{ fontSize: "14px" }}
                      >
                        {footerLinks.secondary.text
                          .split(" ")
                          .slice(-2)
                          .join(" ")}
                      </button>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthApp({ onNext, isLoading }: AuthAppProps) {
  const [currentView, setCurrentView] = useState<"login" | "signup">("login");
  const [isPending, setIsPending] = useState(isLoading);
  const [error, setError] = useState<string>("");

  const handleLogin = async (data: AuthFormData) => {
    setIsPending(true);
    setError("");
    const payload = {
      username: data.username.trim(),
      password: data.password,
    };
    console.log("payload", payload);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login data:", payload);
      onNext(payload, true);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  const handleSignup = async (data: AuthFormData) => {
    setIsPending(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Signup data:", data);
      onNext(data, false);
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password functionality would be implemented here");
    console.log("Forgot password clicked");
  };

  return (
    <>
      {currentView === "login" ? (
        <AuthForm
          title="Login"
          fields={loginFields}
          submitButtonText="Login"
          onSubmit={handleLogin}
          schema={loginSchema}
          isLoading={isPending}
          error={error}
          footerLinks={{
            primary: {
              text: "Forgot password? Get new",
              onClick: handleForgotPassword,
            },
            secondary: {
              text: "Do you have an account? Create new",
              onClick: () => {
                setCurrentView("signup");
                setError("");
              },
            },
          }}
        />
      ) : (
        <AuthForm
          title="Sign Up"
          fields={signupFields}
          submitButtonText="Create Account"
          onSubmit={handleSignup}
          schema={signupSchema}
          isLoading={isPending}
          error={error}
          footerLinks={{
            secondary: {
              text: "Already have an account? Sign in",
              onClick: () => {
                setCurrentView("login");
                setError("");
              },
            },
          }}
        />
      )}
    </>
  );
}

export default AuthApp;
