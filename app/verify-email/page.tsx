// app/verify-email/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg p-6 text-center">
        <CardHeader>
          <Mail className="mx-auto h-12 w-12 text-blue-500" />
          <CardTitle className="mt-4 text-xl font-semibold">
            Konfirmasi Email Anda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Kami telah mengirim link konfirmasi ke{" "}
            <span className="font-medium text-foreground">{email || "email Anda"}</span>.  
            Silakan periksa inbox atau folder spam untuk melanjutkan.
          </p>

          <div className="mt-6 flex flex-col space-y-3">
            <Button asChild>
              <Link href="https://mail.google.com" target="_blank">
                Buka Gmail
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Kembali ke Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
