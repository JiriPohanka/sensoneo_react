import { Label } from "../../label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../select";
import { ErrorMessage } from "../../error-message";

interface PackagingFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const packagingOptions = [
  { value: "pet", label: "PET" },
  { value: "can", label: "Can" },
  { value: "glass", label: "Glass" },
  { value: "tetra", label: "Tetra" },
  { value: "other", label: "Other" },
];

export const PackagingField = ({
  value,
  onChange,
  error,
}: PackagingFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="packaging">Packaging Type *</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="packaging">
          <SelectValue placeholder="Select packaging type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Packaging Type</SelectLabel>
            {packagingOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ErrorMessage error={error} />
    </div>
  );
};
