import Image from "next/image";
import illustration from "../../../../public/undraw_Personal_trainer_re_cnua.png";

export default function Dashboard() {
  return (
    <main className="w-full p-8 mt-8 flex items-center justify-center flex-col gap-8">
      <div className="text-center">
        <h2 className="text-3xl">
          Bem-vindo(a) ao{" "}
          <strong>
            MEU<span className="text-primary">PERSONAL</span>
          </strong>
        </h2>
        <p className="mt-2 text-muted-foreground text-sm">
          Cadastre novos alunos, treinos, exercícios e tenha maior controle
          sobre o seu trabalho.
        </p>
      </div>
      <Image
        src={illustration}
        alt="Illustration"
        className="max-w-lg w-full rounded-full"
        priority={true}
      />
    </main>
  );
}
