import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export default function Home() {
  return (
    <div>
      <div className={cn("text-red-600", {
        "bg-black": true
      })}>
        Hello, world!
      </div>

      <Button>Test button</Button>
    </div>
  );
}
