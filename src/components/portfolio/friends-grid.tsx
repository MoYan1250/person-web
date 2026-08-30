"use client";

import { useMemo, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  friendDomain,
  friendInitials,
  type FriendItem,
} from "@/lib/content";

export function FriendsGrid({
  friends,
  visitLabel,
  searchPlaceholder,
  emptyLabel,
}: {
  friends: FriendItem[];
  visitLabel: string;
  searchPlaceholder: string;
  emptyLabel: string;
}) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return friends;
    return friends.filter((friend) => {
      const domain = friendDomain(friend).toLowerCase();
      return (
        friend.name.toLowerCase().includes(needle) ||
        friend.description.toLowerCase().includes(needle) ||
        domain.includes(needle)
      );
    });
  }, [friends, query]);

  return (
    <div>
      <label className="sr-only" htmlFor="friends-search">
        {searchPlaceholder}
      </label>
      <input
        id="friends-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={searchPlaceholder}
        className="border-border glass-panel text-foreground placeholder:text-muted-foreground mb-8 w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      />

      {visible.length === 0 ? (
        <p className="text-muted-foreground text-sm">{emptyLabel}</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((friend) => {
            const domain = friendDomain(friend);
            return (
              <li key={`${friend.name}-${friend.url}`}>
                <article className="border-border glass-panel hover:border-primary/40 flex h-full flex-col rounded-xl border p-5 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12 border">
                      {friend.avatar ? (
                        // External friend avatars are user-supplied URLs.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={friend.avatar}
                          alt=""
                          className="size-full object-cover"
                        />
                      ) : null}
                      <AvatarFallback>{friendInitials(friend.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-semibold tracking-tight">
                        {friend.name}
                      </h2>
                      <p className="text-muted-foreground truncate font-mono text-[11px]">
                        {domain}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4 flex-1 text-sm leading-relaxed">
                    {friend.description}
                  </p>
                  <a
                    href={friend.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary mt-4 text-sm font-semibold transition-opacity hover:opacity-70"
                  >
                    {visitLabel}
                  </a>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
