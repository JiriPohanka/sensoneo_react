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
import { useUsers } from "../../../queries/useUsers";

interface UserFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const UserSelectField = ({ value, onChange, error }: UserFieldProps) => {
  const { data: users, isLoading } = useUsers();
  return (
    <div className="space-y-2">
      <Label htmlFor="registeredById">Registered By *</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="registeredById">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Users</SelectLabel>
            {isLoading ? (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                Loading users...
              </div>
            ) : (
              users?.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.firstName} {user.lastName}
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
