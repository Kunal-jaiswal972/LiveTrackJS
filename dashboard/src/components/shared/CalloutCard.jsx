import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

export const CalloutCard = ({ variant, text }) => {
  return (
    <Alert variant={variant}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{text}</AlertTitle>
    </Alert>
  );
};

