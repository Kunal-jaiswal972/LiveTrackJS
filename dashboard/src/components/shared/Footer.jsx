import { Link } from "react-router-dom";
import { Github } from "lucide-react";
export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center justify-center gap-2  text-muted-foreground ">
        <p className="text-xs md:text-sm leading-loose text-left">
          The source code is available on
          <Link
            to="https://github.com/Kunal-jaiswal972/LiveTrackJS"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {" "}
            GitHub
          </Link>
        </p>
        <Github className="w-4 h-4" />
      </div>
    </div>
  );
}

export default Footer;
