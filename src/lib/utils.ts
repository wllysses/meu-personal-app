import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAndClassifyIMC(weight: number, height: number) {
  const imc = weight / (height * height);
  let classify;

  if (imc < 18.5) {
    classify = "Abaixo do peso";
  } else if (imc >= 18.5 && imc < 24.9) {
    classify = "Peso ideal";
  } else if (imc > 25 && imc < 29.9) {
    classify = "Acima do peso";
  } else if (imc >= 30 && imc < 34.9) {
    classify = "Obesidade grau I";
  } else if (imc >= 35 && imc < 39.9) {
    classify = "Obesidade grau II";
  } else if (imc >= 40) {
    classify = "Obesidade grau III";
  }

  return {
    imc,
    classify,
  };
}
