"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

const slides = [
  {
    src: "/images/FOTO AMPARO.webp",
    alt: "Atendimento humanizado",
    text: "Saúde com cuidado, inovação e proximidade que você merece.",
  },
  {
    src: "/images/fotos-tcc.webp",
    alt: "Tecnologia na saúde",
    text: "Tecnologia avançada para transformar seu bem-estar em prioridade.",
  },
  {
    src: "/images/fotos-tcc2.jpeg",
    alt: "Equipe DevMed",
    text: "Uma equipe dedicada que une conhecimento e empatia para cuidar de você.",
  },
  {
    src: "/images/fachada.webp",
    alt: "Equipe DevMed",
    text: "DevMed: excelência em saúde, sempre ao seu lado.",
  },
]


export function HeroCarousel() {
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }) // ✅ 3 segundos e não para ao interagir
  )

  return (
    <Carousel
      plugins={[autoplay.current]} // ✅ garante o autoplay ativo
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-full"
    >
      <CarouselContent>
        {slides.map((slide, i) => (
          <CarouselItem key={i}>
            <div className="relative h-[500px] w-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center max-w-2xl px-4">
                  {slide.text}
                </h2>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
