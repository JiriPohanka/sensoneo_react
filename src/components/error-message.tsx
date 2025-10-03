interface ErrorMessageProps {
  error?: string;
  className?: string;
}

export const ErrorMessage = ({ error, className }: ErrorMessageProps) => {
  if (!error) return null;

  return <p className={`text-sm text-red-600 ${className || ""}`}>{error}</p>;
};
