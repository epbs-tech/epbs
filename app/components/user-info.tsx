import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({
  user,
  label,
}: UserInfoProps) => {
  return (
    <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          { label: "ID", value: user?.id },
          { label: "Name", value: user?.name },
          { label: "Email", value: user?.email },
          { label: "Role", value: user?.role },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border p-3 shadow-sm gap-y-1"
          >
            <p className="text-sm font-medium">{label}</p>
            <p className="truncate text-xs font-mono bg-slate-100 p-1 rounded-md max-w-full sm:max-w-[180px] text-right">
              {value}
            </p>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border p-3 shadow-sm gap-y-1">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
