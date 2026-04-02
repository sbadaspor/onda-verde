import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginPageClient } from "./LoginPageClient";

export const metadata: Metadata = {
  title: "Entrar | Onda Verde",
    description: "Acede à tua área de sócio do Rio Ave FC.",
    };

    export default async function LoginPage() {
      const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
          if (user) redirect("/dashboard");
            return <LoginPageClient />;
            }
