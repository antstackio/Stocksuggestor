import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Fun Loading Message with GIF */}
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <Image
          src="/loading-money.gif"
          alt="Make it rain"
          width={300}
          height={300}
          className="rounded-lg"
          unoptimized
        />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Fetching Fresh Stock Data...</h2>
          <p className="text-lg text-muted-foreground">
            The API is taking its sweet time. Hang tight! 💰
          </p>
          <p className="text-sm text-muted-foreground animate-pulse">
            Loading your money-making opportunities...
          </p>
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
