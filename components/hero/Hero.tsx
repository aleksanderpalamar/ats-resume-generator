"use client"

import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    <section className="bg-zinc-50">
      <div
        style={{
          backgroundImage: "url(/assets/hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-4xl space-x-2 font-bold text-zinc-900 mb-2">
            <span className="text-zinc-900">
              Criador de curriculos
            </span>
            <span className="text-violet-500">
              <Typewriter
                words={["Profissional", "Otimizado", "ATS-friendly"]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
          <Link
            href="/builder"
            className="inline-block bg-violet-500 text-white-600 px-6 py-3 rounded-lg font-bold text-lg transition duration-200 hover:bg-violet-600 hover:text-zinc-200 transform hover:shadow-lg"
          >
            Crie seu currículo
          </Link>
        </div>
      </div>
    </section>
  )
}