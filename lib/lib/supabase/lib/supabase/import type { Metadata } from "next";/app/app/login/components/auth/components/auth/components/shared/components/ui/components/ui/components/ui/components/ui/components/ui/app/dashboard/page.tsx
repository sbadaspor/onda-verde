import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { LogoutButton } from "./LogoutButton";

export const metadata: Metadata = {
  title: "Dashboard | Onda Verde",
  };

  export default async function DashboardPage() {
    const supabase = await createClient();
      const {
          data: { user },
            } = await supabase.auth.getUser();

              if (!user) redirect("/login");

                return (
                    <main className="min-h-screen bg-rioave-gray">
                          {/* Header */}
                                <header className="bg-rioave-green text-white px-4 py-4 flex items-center justify-between shadow-lg">
                                        <div>
                                                  <h1 className="text-lg font-bold tracking-tight">Onda Verde</h1>
                                                            <p className="text-green-100 text-xs">Rio Ave FC · Área de Sócios</p>
                                                                    </div>
                                                                            <LogoutButton />
                                                                                  </header>

                                                                                        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
                                                                                                {/* Boas vindas */}
                                                                                                        <div className="bg-white rounded-xl p-5 shadow-sm border border-rioave-green-100">
                                                                                                                  <h2 className="text-lg font-bold text-rioave-green-dark">
                                                                                                                              Bem-vindo, Sócio! 👋
                                                                                                                                        </h2>
                                                                                                                                                  <p className="text-sm text-gray-500 mt-1">
                                                                                                                                                              Telemóvel: {user.phone}
                                                                                                                                                                        </p>
                                                                                                                                                                                </div>

                                                                                                                                                                                        {/* Cards de acesso rápido */}
                                                                                                                                                                                                <div className="grid grid-cols-2 gap-3">
                                                                                                                                                                                                          {[
                                                                                                                                                                                                                      { icon: "🎟️", label: "Bilhetes", desc: "Próximos jogos" },
                                                                                                                                                                                                                                  { icon: "⭐", label: "Benefícios", desc: "Vantagens exclusivas" },
                                                                                                                                                                                                                                              { icon: "📰", label: "Notícias", desc: "Últimas novidades" },
                                                                                                                                                                                                                                                          { icon: "👤", label: "Perfil", desc: "Gerir conta" },
                                                                                                                                                                                                                                                                    ].map((item) => (
                                                                                                                                                                                                                                                                                <div
                                                                                                                                                                                                                                                                                              key={item.label}
                                                                                                                                                                                                                                                                                                            className="bg-white rounded-xl p-4 shadow-sm border border-rioave-green-100 cursor-pointer hover:border-rioave-green transition-colors"
                                                                                                                                                                                                                                                                                                                        >
                                                                                                                                                                                                                                                                                                                                      <div className="text-2xl mb-2">{item.icon}</div>
                                                                                                                                                                                                                                                                                                                                                    <p className="font-semibold text-rioave-green-dark text-sm">
                                                                                                                                                                                                                                                                                                                                                                    {item.label}
                                                                                                                                                                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                                                                                                                                                                <p className="text-xs text-gray-500">{item.desc}</p>
                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                                      ))}
                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                        </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                                                                                                          }