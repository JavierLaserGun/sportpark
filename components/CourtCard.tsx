import Link from "next/link";
import Image from "next/image";
import type { Sport } from "@/lib/types";

const COURT_IMAGES = {
  pickleball: "/pickleball-court.png",
  futsal: "/futsal-court.png",
};

export default function CourtCard({ sport, index }: { sport: Sport; index: number }) {
  const imageSrc = COURT_IMAGES[sport.image as keyof typeof COURT_IMAGES];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-md">
      <div className="relative h-56 w-full sm:h-64 bg-muted">
        <Image
          src={imageSrc}
          alt={`${sport.name} court`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="p-6">
        <p className="text-sm font-semibold text-brand">{index.toString().padStart(2, "0")}</p>
        <h3 className="mt-1 text-xl font-bold uppercase tracking-tight">{sport.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{sport.shortDescription}</p>
        <p className="mt-4 text-lg font-bold">
          BND ${sport.pricePerHour.toFixed(2)} <span className="text-sm font-normal text-muted">/ HOUR</span>
        </p>
        <Link
          href={`/booking/${sport.slug}`}
          className="mt-5 flex w-full items-center justify-center rounded-md border border-brand py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
        >
          _BOOK NOW
        </Link>
      </div>
    </div>
  );
}