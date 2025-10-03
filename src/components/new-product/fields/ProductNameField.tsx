import { Input } from "../../input";
import { Label } from "../../label";
import { ErrorMessage } from "../../error-message";

interface ProductNameFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const ProductNameField = ({
  value,
  onChange,
  error,
}: ProductNameFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">Product Name *</Label>
      <Input
        id="name"
        placeholder="Enter product name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <ErrorMessage error={error} />
    </div>
  );
};
