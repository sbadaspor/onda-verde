"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";
import { OtpForm } from "@/components/auth/OtpForm";
import { RioAveLogo } from "@/components/shared/RioAveLogo";
type AuthStep = "phone" | "otp";
export function LoginPageClient() {
    const [step, setStep] = useState<AuthStep>("phone");
    const [phone, setPhone] = useState("");
    return (
          <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-rioave-green-dark via-rioave-green to-rioave-green-light px-4 py-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="relative z-10 w-full max-w-sm space-y-8">
                        <div className="flex flex-col items-center space-y-4">
                                  <RioAveLogo size={90} />
                                  <div className="text-center">
                                              <h1 className="text-3xl font-bold text-white tracking-tight">Onda Verde</h1>h1>
                                              <p className="text-green-100 text-sm mt-1 font-medium tracking-wide uppercase">Rio Ave FC - Area de Socios</p>p>
                                  </div>div>
                        </div>div>
                        <Card className="shadow-2xl border-0 bg-white/98 backdrop-blur-sm">
                                  <CardHeader className="space-y-1 pb-4 text-center">
                                              <CardTitle className="text-xl font-bold text-rioave-green-dark">{step === "phone" ? "Bem-vindo de volta" : "Verificacao SMS"}</CardTitle>CardTitle>
                                              <CardDescription className="text-sm">{step === "phone" ? "Insere o teu numero para aceder" : "Insere o codigo que recebeste por SMS"}</CardDescription>CardDescription>
                                  </CardHeader>CardHeader>
                                  <CardContent className="pb-6">
                                              <div className="flex items-center gap-2 mb-6" aria-hidden="true">
                                                            <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step === "phone" ? "bg-rioave-green" : "bg-rioave-green-light"}`} />
                                                            <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step === "otp" ? "bg-rioave-green" : "bg-gray-200"}`} />
                                              </div>div>
                                    {step === "phone" ? (
                          <LoginForm onOtpSent={(p) => { setPhone(p); setStep("otp"); }} />
                        ) : (
                          <OtpForm phone={phone} onBack={() => { setStep("phone"); setPhone(""); }} />
                        )}
                                  </CardContent>CardContent>
                        </Card>Card>
                        <p className="text-center text-xs text-green-100/70">&copy; {new Date().getFullYear()} Rio Ave FC</p>p>
                </div>div>
          </main>main>
        );
}</main>
