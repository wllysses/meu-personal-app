import Image from "next/image";
import { BarChart, KanbanSquare, SendIcon, UsersRound } from "lucide-react";
import illustration from "../../public/undraw_Personal_trainer_re_cnua.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/header";
import pontosPositivos from "@/mocks/pontos-positivos.json";
import perguntasFrequentes from "@/mocks/perguntas-frequentes.json";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full my-12">
        <div className="container mx-auto px-4">
          <section
            id="hero"
            className="w-full grid grid-cols-2 pt-12 gap-6 max-md:grid-cols-1"
          >
            <div className="flex flex-col justify-center gap-2">
              <h2 className="font-bold text-5xl leading-tight">
                Conheça a nossa <br />{" "}
                <span className="text-primary">PLATAFORMA</span>
              </h2>
              <p className="leading-8 text-justify max-w-lg max-md:max-w-full">
                Nossa missão é simplificar e potencializar a jornada do treino,
                oferecendo uma experiência centralizada para personal trainers
                gerenciarem clientes, criarem treinos personalizados e
                acompanharem resultados - tudo em um só lugar.
              </p>
              <Button className="mt-4 w-fit">Quero conhecer</Button>
            </div>
            <div>
              <Image
                src={illustration}
                alt="Illustration Png"
                className="max-w-xl w-full rounded-full"
                priority={true}
              />
            </div>
          </section>

          <section
            id="cards"
            className="mt-20 w-full flex flex-col items-center gap-16"
          >
            <h2 className="font-bold text-4xl">
              Por que <span className="text-primary">utilizar?</span>
            </h2>
            <div className="w-full grid grid-cols-4 gap-8 max-lg:grid-grid-3 max-md:grid-cols-2 max-[540px]:grid-cols-1">
              {pontosPositivos &&
                pontosPositivos.map((info) => (
                  <Card key={info.id} className="hover:scale-105 duration-100">
                    <CardHeader className="items-center gap-2">
                      <KanbanSquare size={40} />
                      <h4 className="font-semibold text-xl">{info.titulo}</h4>
                    </CardHeader>
                    <CardContent className="text-justify text-sm">
                      {info.descricao}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        </div>
        <section id="faq" className="bg-primary p-8 mt-16">
          <div className="w-full container mx-auto flex flex-col gap-8">
            <h2 className="font-bold text-4xl text-center">
              Perguntas frequenetes
            </h2>
            <Accordion type="single" collapsible>
              {perguntasFrequentes &&
                perguntasFrequentes.map((pergunta) => (
                  <AccordionItem
                    key={pergunta.id}
                    value={`item-${pergunta.id}`}
                  >
                    <AccordionTrigger>{pergunta.pergunta}</AccordionTrigger>
                    <AccordionContent>{pergunta.resposta}</AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        </section>
        <section
          id="contact"
          className="w-full container mx-autom mt-12 flex flex-col gap-4 items-center px-4"
        >
          <div className="text-center">
            <h2 className="font-bold text-4xl">
              Dúvidas ou <span className="text-primary">sugestões?</span>
            </h2>
            <p className="mt-2 font-light">
              Envie a sua mensagem e nos ajude a melhorar cada vez mais.
            </p>
          </div>
          <form className="mt-6 max-w-xl w-full flex flex-col gap-2">
            <Textarea
              className="resize-none h-64"
              placeholder="Envie aqui a sua mensagem"
            />
            <Button type="submit">Enviar</Button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
