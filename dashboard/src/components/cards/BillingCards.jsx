import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useCheckoutStore } from "@/store/paymentStore";

export const BillingCard = ({ title, price, features, type }) => {
  const { isLoading, error, createCheckoutSession } = useCheckoutStore();

  const handleCheckout = () => {
    createCheckoutSession(type);
  };

  return (
    <Card className="bg-muted shadow-lg rounded-lg overflow-hidden w-[300px]">
      <CardHeader className="bg-muted text-green-400 py-4 px-6">
        <h2 className="text-xl font-bold">{title}</h2>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl text-green-400 font-bold">${price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>

        <ul className="space-y-2 text-muted-foreground">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full text-green-400 dark:text-green-400 border dark:hover:border-0 border-green-400 hover:bg-green-400 hover:text-white dark:hover:text-black dark:bg-gray-700 dark:hover:bg-gray-400 transition-colors duration-300"
          onClick={handleCheckout}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};
