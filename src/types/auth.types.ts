interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  required?: boolean;
  icon?: string;
}

interface AuthFormData {
  [key: string]: string;
}

interface AuthFormProps {
  title: string;
  fields: FormField[];
  submitButtonText: string;
  onSubmit: (data: AuthFormData) => void | Promise<void>;
  footerLinks?: {
    primary?: { text: string; onClick: () => void };
    secondary?: { text: string; onClick: () => void };
  };
  isLoading?: boolean;
  error?: string;
}

interface LoginFormProps {
  onForgotPassword: () => void;
  onCreateAccount: () => void;
  onLogin: (data: AuthFormData) => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
}

interface SigninFormProps {
  onLogin: () => void;
  onSignup: (data: AuthFormData) => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
}

interface AuthAppProps {
  onNext: (value: any, isLogin: boolean) => void;
  isLoading: boolean;
}


export interface UserResponse {
  id: number;
  full_name: string;
  email: string;
  profile_image_url?: string;
  fallback_image?: string;
}

export interface UserStore {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
  removeUser: () => void;
}
export type {
  AuthFormProps,
  FormField,
  AuthFormData,
  LoginFormProps,
  SigninFormProps,
  AuthAppProps,
};
