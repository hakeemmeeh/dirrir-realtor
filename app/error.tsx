"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">Error</p>
      <h1 className="mt-4 font-serif text-3xl text-primary sm:text-4xl">Something went wrong</h1>
      <p className="mt-4 max-w-md text-text-light">
        A runtime error occurred while loading this page. You can try again or return to the homepage.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button variant="primary" onClick={reset}>
          Try again
        </Button>
        <Button href="/" variant="secondary">
          Home
        </Button>
      </div>
      {process.env.NODE_ENV === "development" && error.message ? (
        <pre className="mt-12 max-w-full overflow-x-auto rounded-sm border border-border bg-background-alt p-4 text-left text-xs text-text">
          {error.message}
        </pre>
      ) : null}
    </Container>
  );
}
