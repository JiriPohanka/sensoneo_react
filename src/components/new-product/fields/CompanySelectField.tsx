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
import { useCompanies } from "../../../queries/useCompanies";

interface CompanyFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const CompanySelectField = ({
  value,
  onChange,
  error,
}: CompanyFieldProps) => {
  const { data: companies, isLoading } = useCompanies();
  return (
    <div className="space-y-2">
      <Label htmlFor="companyId">Company *</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="companyId">
          <SelectValue placeholder="Select a company" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Companies</SelectLabel>
            {isLoading ? (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                Loading companies...
              </div>
            ) : (
              companies?.map((company) => (
                <SelectItem key={company.id} value={company.id.toString()}>
                  {company.name}
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ErrorMessage error={error} />
    </div>
  );
};
