"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/react-aria/Button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error);
  }, [error]);

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col gap-2 justify-center items-center h-full">
        <h2 className="text-xl font-semibold">Something went wrong!</h2>
        {/* <div>{error.message}</div> */}
        <Button
          variant="icon"
          onPress={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
