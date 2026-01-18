import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function Disclaimer() {
  return (
    <Alert variant="destructive" className="bg-orange-50 border-orange-500 dark:bg-orange-950/20">
      <AlertTriangle className="h-5 w-5 text-orange-600" />
      <AlertDescription className="text-orange-900 dark:text-orange-300 font-medium">
        ⚠️ <strong>NOT SEBI approved!</strong> This is for fun & learning only. If you lose money following this AI, blame the algorithm (and maybe your uncle who recommended it). Trade at your own risk! 📉💸
      </AlertDescription>
    </Alert>
  );
}
