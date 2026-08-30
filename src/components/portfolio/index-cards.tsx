import { Icons } from "@/components/icons";
import { Link } from "@/i18n/routing";

type IndexCard = {
  href: string;
  icon: keyof typeof Icons;
  title: string;
  description: string;
};

export function IndexCards({ cards }: { cards: IndexCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {cards.map((card) => {
        const Icon = Icons[card.icon] || Icons.home;
        return (
          <Link
            key={card.href}
            href={card.href}
            className="border-border bg-card hover:bg-accent/40 focus-visible:ring-ring group rounded-xl border p-4 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none"
          >
            <div className="mb-3 flex items-center gap-2">
              <Icon className="text-muted-foreground size-4" />
              <h3 className="text-sm font-semibold">{card.title}</h3>
            </div>
            <p className="text-muted-foreground text-sm">{card.description}</p>
          </Link>
        );
      })}
    </div>
  );
}
