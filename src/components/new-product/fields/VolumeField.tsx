import { Input } from "../../input";
import { Label } from "../../label";
import { ErrorMessage } from "../../error-message";

interface VolumeFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const VolumeField = ({ value, onChange, error }: VolumeFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="volume">Volume (ml) *</Label>
      <Input
        id="volume"
        type="number"
        placeholder="e.g., 330"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <ErrorMessage error={error} />
    </div>
  );
};
