"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
    const supabase = createClient();

      const handleLogout = async () => {
          await supabase.auth.signOut();
              router.push("/login");
                  router.refresh();
                    };

                      return (
                          <button
                                onClick={handleLogout}
                                      className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors py-1 px-2 rounded-md hover:bg-white/10"
                                          >
                                                <LogOut className="h-4 w-4" />
                                                      Sair
                                                          </button>
                                                            );
                                                            }