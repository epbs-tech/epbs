import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-destructive/15 p-3 rounded-md text-destructive text-sm w-full max-w-full overflow-auto">
      <ExclamationTriangleIcon className="h-5 w-5 min-w-[20px]" />
      <p className="break-words">{message}</p>
    </div>
  );
};
