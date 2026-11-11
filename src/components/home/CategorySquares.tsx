import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategorySquares() {
  const items = [...categories, ...categories];

  return (
    <section className="py-10 md:py-14">
      <div className="text-center mb-8 px-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-ink">קנייה לפי סוג פרח</h2>
      </div>

      <div className="group relative overflow-hidden">
        <div
          dir="ltr"
          className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "40s" }}
        >
          {items.map((category, i) => (
            <Link
              key={`${category.slug}-${i}`}
              href={`/category/${category.slug}`}
              className="group/item relative w-40 sm:w-52 aspect-square overflow-hidden shrink-0"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 768px) 160px, 208px"
                className="object-cover transition-transform duration-700 group-hover/item:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 group-hover/item:bg-black/35 transition-colors" />
              <div className="absolute inset-0 flex items-end justify-center pb-5">
                <h3 className="font-serif text-white text-lg sm:text-xl tracking-wide">{category.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
