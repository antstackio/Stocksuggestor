import { FileQuestion } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = "No data available",
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground text-center">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
