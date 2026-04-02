"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { createClient } from "@/lib/supabase/client";
import { Loader2, ArrowLeft, RefreshCw } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
interface OtpFormProps { phone: string; onBack: () => void; }
const RESEND_COOLDOWN = 60;
export function OtpForm({ phone, onBack }: OtpFormProps) {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const router = useRouter();
    const supabase = createClient();
    const startCooldown = () => {
          setCooldown(RESEND_COOLDOWN);
          timerRef.current = setInterval(() => { setCooldown((prev) => { if (prev <= 1) { clearInterval(timerRef.current!); return 0; } return prev - 1; }); }, 1000);
    };
    const handleVerify = async (value: string) => {
          if (value.length !== 6) return;
          setError(null); setLoading(true);
          try {
                  const { error: verifyError } = await supabase.auth.verifyOtp({ phone, token: value, type: "sms" });
                  if (verifyError) { setOtp(""); setError(verifyError.message.includes("expired") ? "Codigo expirado. Solicita um novo codigo." : "Codigo invalido. Verifica e tenta novamente."); return; }
                  router.push("/dashboard"); router.refresh();
          } catch { setError("Ocorreu um erro inesperado."); } finally { setLoading(false); }
    };
    const handleOtpChange = (value: string) => { setOtp(value); if (error) setError(null); if (value.length === 6) handleVerify(value); };
    const handleResend = async () => {
          if (cooldown > 0 || resending) return;
          setResending(true); setError(null);
          try {
                  const { error: resendError } = await supabase.auth.signInWithOtp({ phone, options: { shouldCreateUser: true } });
                  if (resendError) { setError("Erro ao reenviar. Tenta mais tarde."); return; }
                  startCooldown();
          } catch { setError("Erro ao reenviar o codigo."); } finally { setResending(false); }
    };
    const maskedPhone = phone.replace(/(\+351)(9\d)(\d{3})(\d{4})/, "$1 $2* *** $4");
    return (
          <div className="space-y-6">
                <div className="text-center space-y-1">
                        <p className="text-sm text-muted-foreground">Codigo enviado para</p>p>
                        <p className="font-semibold text-rioave-green-dark">{maskedPhone}</p>p>
                </div>div>
                <div className="flex flex-col items-center space-y-4">
                        <InputOTP maxLength={6} value={otp} onChange={handleOtpChange} disabled={loading} pattern={REGEXP_ONLY_DIGITS} aria-label="Codigo de verificacao de 6 digitos">
                                  <InputOTPGroup className="gap-2">
                                    {[0,1,2,3,4,5].map((i) => (<InputOTPSlot key={i} index={i} className={`h-12 w-10 text-lg font-bold border-2 rounded-lg transition-all duration-150 ${error ? "border-destructive" : ""}`} />))}
                                  </InputOTPGroup>InputOTPGroup>
                        </InputOTP>InputOTP>
                  {error && <p role="alert" className="text-sm text-destructive text-center">&#9888; {error}</p>p>}
                  {loading && <p className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />A verificar...</p>p>}
                </div>div>
                <div className="text-center">
                        <Button variant="ghost" size="sm" onClick={handleResend} disabled={cooldown > 0 || resending} className="text-rioave-green hover:text-rioave-green-dark text-sm">
                          {resending ? (<><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />A reenviar...</>>) : cooldown > 0 ? `Reenviar em ${cooldown}s` : (<><RefreshCw className="mr-1.5 h-3.5 w-3.5" />Reenviar codigo</>>)}
                        </Button>Button>
                </div>div>
                <Button variant="outline" onClick={onBack} disabled={loading} className="w-full border-rioave-green text-rioave-green hover:bg-rioave-green-50">
                        <ArrowLeft className="mr-2 h-4 w-4" />Alterar numero
                </Button>Button>
          </div>div>
        );
}</></></div>
