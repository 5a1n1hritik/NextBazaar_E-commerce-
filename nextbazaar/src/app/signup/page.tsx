"use client";

import { Button } from "@/components/ui/button";
import { Mail, Github, Twitter, Construction } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-background p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <div className="relative mx-auto h-24 w-24 rounded-full bg-muted p-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <Construction className="h-12 w-12 text-primary animate-bounce" />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="inline-block text-primary">Coming Soon</span>
          </h1>

          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We're working hard to bring you something amazing. Our website is
            under development and will be ready soon.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <form className="flex space-x-2">
            <div className="grid flex-1 gap-2">
              <Button variant="outline" className="w-full">
                Get Notified When We Launch
              </Button>
            </div>
          </form>
        </div>
        <div className="flex justify-center space-x-4">
          <Link
            href="#"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
          <Link
            href="#"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="#"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
