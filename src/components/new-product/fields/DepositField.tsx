import { Input } from "../../input";
import { Label } from "../../label";
import { ErrorMessage } from "../../error-message";

interface DepositFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const DepositField = ({ value, onChange, error }: DepositFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="deposit">Deposit (cents) *</Label>
      <Input
        id="deposit"
        type="number"
        placeholder="e.g., 100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <ErrorMessage error={error} />
    </div>
  );
};
