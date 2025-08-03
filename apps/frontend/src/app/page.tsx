import cn from "classnames";

export default function Home() {
  return (
    <div className={cn("text-red-600", {
      "bg-white": true,
    })}>
            Hello, world!
    </div>
  );
}
