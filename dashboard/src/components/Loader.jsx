import { LoaderCircle } from "lucide-react";

export const Loader = ({ message }) => {
  return (
    <div className="text-gray-500 font-medium flex gap-2 items-center justify-center p-4">
      <p>{message}</p>
      <LoaderCircle className="w-6 h-6 animate-spin" />
    </div>
  );
};
