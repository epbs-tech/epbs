import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-emerald-500/15 p-3 rounded-md text-emerald-500 text-sm w-full max-w-full overflow-auto">
      <CheckCircledIcon className="h-5 w-5 min-w-[20px]" />
      <p className="break-words">{message}</p>
    </div>
  );
};
