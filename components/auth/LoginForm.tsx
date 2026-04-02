"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { validateAndFormatPortuguesePhone } from "@/lib/utils";
import { Loader2, Smartphone } from "lucide-react";
interface LoginFormProps { onOtpSent: (phone: string) => void; }
export function LoginForm({ onOtpSent }: LoginFormProps) {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const supabase = createClient();
    const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setError(null);
          setLoading(true);
          const { valid, formatted, error: validationError } = validateAndFormatPortuguesePhone(phone);
          if (!valid) { setError(validationError!); setLoading(false); return; }
          try {
                  const { error: supabaseError } = await supabase.auth.signInWithOtp({ phone: formatted, options: { shouldCreateUser: true } });
                  if (supabaseError) { setError(supabaseError.message.includes("rate") ? "Demasiadas tentativas. Aguarda alguns minutos." : "Erro ao enviar SMS. Tenta novamente."); return; }
                  onOtpSent(formatted);
          } catch { setError("Ocorreu um erro inesperado."); } finally { setLoading(false); }
    };
    return (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-rioave-green-dark">Numero de Telemovel</Label>Label>
                        <div className="relative">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                              <span className="text-muted-foreground text-sm font-medium select-none">PT +351</span>span>
                                  </div>div>
                                  <Input id="phone" type="tel" inputMode="numeric" placeholder="912 345 678" value={phone}
                                                onChange={(e) => { setPhone(e.target.value); if (error) setError(null); }}
                                                disabled={loading} className={`pl-[4.5rem] h-12 text-base tracking-widest ${error ? "border-destructive" : ""}`}
                                                autoComplete="tel" aria-describedby={error ? "phone-error" : undefined} aria-invalid={!!error} />
                        </div>div>
                  {error && <p id="phone-error" role="alert" className="text-sm text-destructive">&#9888; {error}</p>p>}
                </div>div>
                <Button type="submit" disabled={loading || !phone.trim()} className="w-full h-12 text-base font-semibold bg-rioave-green hover:bg-rioave-green-dark transition-colors duration-200">
                  {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />A enviar SMS...</>>) : (<><Smartphone className="mr-2 h-4 w-4" />Receber Codigo</>>)}
                </Button>Button>
                <p className="text-xs text-center text-muted-foreground">Iras receber um SMS com um codigo de 6 digitos.</p>p>
          </form>form>
        );
}</></></form>
