import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, ImageOff } from "lucide-react";

export const SiteHeading = ({ site }) => {
    console.log(site)
  const { host, favicon } = site;

  return (
    <a
      href={`https://${host}`}
      target="_blank"
      rel="noopener noreferrer"
      className="space-x-2 flex items-center"
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={favicon} alt="Favicon" />
        <AvatarFallback>
          <ImageOff className="w-5 h-5" />
        </AvatarFallback>
      </Avatar>
      <span>{host}</span>
      <ExternalLink className="w-6 h-6" />
    </a>
  );
};
