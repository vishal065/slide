import {
  Sheet as ShadcnSheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  side: "left" | "right";
};

const Sheet = ({ trigger, children, className, side }: Props) => {
  return (
    <ShadcnSheet>
      <SheetTrigger className={className}>{trigger}</SheetTrigger>
      <SheetContent className="p-0" side={side}>
        {children}
      </SheetContent>
    </ShadcnSheet>
  );
};

export default Sheet;
