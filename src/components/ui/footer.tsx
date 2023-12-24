import Link from "next/link";

export function Footer() {
  return (
    <footer className="p-4 bg-primary text-center">
      <h4 className="font-medium">
        Desenvolvido por{" "}
        <Link
          href="https://linkedin.com/in/wllysses"
          target="_blank"
          className="hover:underline"
        >
          Wllysses Tavares
        </Link>
      </h4>
      <p className="text-xs mt-2">Todos os direitos reservados</p>
    </footer>
  );
}
