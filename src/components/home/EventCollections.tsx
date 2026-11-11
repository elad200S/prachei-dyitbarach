import Image from "next/image";
import Link from "next/link";
import { events } from "@/lib/data";

export default function EventCollections() {
  const items = [...events, ...events];

  return (
    <section className="py-12 md:py-16">
      <div className="text-center mb-10 px-4">
        <h2 className="font-serif text-2xl sm:text-3xl text-ink">קנייה לפי אירוע</h2>
      </div>

      <div className="group relative overflow-hidden">
        <div
          dir="ltr"
          className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "32s" }}
        >
          {items.map((event, i) => (
            <Link
              key={`${event.slug}-${i}`}
              href={`/event/${event.slug}`}
              className="group/item shrink-0 w-44 sm:w-56 ms-6 flex flex-col items-center gap-3"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="224px"
                  className="object-cover transition-transform duration-500 group-hover/item:scale-105"
                />
              </div>
              <span className="text-sm text-ink/70 group-hover/item:text-accent transition-colors">
                {event.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
