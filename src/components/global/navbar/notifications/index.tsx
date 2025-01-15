import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

type Props = {};

const Notifications = (props: Props) => {
  return (
    <Button>
      <Bell color="#3352CC" fill="#3352CC " />
    </Button>
  );
};

export default Notifications;
