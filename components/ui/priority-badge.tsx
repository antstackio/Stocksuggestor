import { Badge } from "@/components/ui/badge";
import { Priority } from "@/types/api";

interface PriorityBadgeProps {
  priority: Priority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <Badge
      variant={priority === "HIGH" ? "destructive" : "secondary"}
      className={
        priority === "HIGH"
          ? "bg-orange-500 hover:bg-orange-600"
          : "bg-yellow-500 hover:bg-yellow-600 text-black"
      }
    >
      {priority}
    </Badge>
  );
}
