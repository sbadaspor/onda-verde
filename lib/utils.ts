import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
  }

  export function validateAndFormatPortuguesePhone(phone: string): {
    valid: boolean;
      formatted: string;
        error?: string;
        } {
          const cleaned = phone.replace(/[\s\-().]/g, "");

            const patterns = [
                /^\+351(9[1236]\d{7})$/,
                    /^00351(9[1236]\d{7})$/,
                        /^(9[1236]\d{7})$/,
                          ];

                            for (const pattern of patterns) {
                                const match = cleaned.match(pattern);
                                    if (match) {
                                          return { valid: true, formatted: `+351${match[1]}` };
                                              }
                                                }

                                                  return {
                                                      valid: false,
                                                          formatted: "",
                                                              error: "Insere um número de telemóvel português válido (ex: 912 345 678)",
                                                                };
                                                                }