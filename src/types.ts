export type Word = {
    id: number;
    en: string;
    es: string;
  };

export type TraductionMode = "es-en"|"en-es"

export type CustomResponse = {
  status:"ok"|"error",
  message:"string"
}

export type ToastType = "success" | "danger" | "warning";
export type ToastDurationType = 1000 | 2000| 3000 | 5000;