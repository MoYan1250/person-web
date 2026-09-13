import { getPaperBlurb } from "@/data/paper-blurbs";
import { READ_PAPERS, type PaperRecord } from "@/data/read-papers";

export type PaperTag =
  | "marl"
  | "rl"
  | "games"
  | "imitation"
  | "llm"
  | "eval"
  | "comm"
  | "deception"
  | "hierarchy"
  | "pomdp"
  | "blockchain";

export const PAPER_TAGS: PaperTag[] = [
  "marl",
  "rl",
  "games",
  "imitation",
  "llm",
  "eval",
  "comm",
  "deception",
  "hierarchy",
  "pomdp",
  "blockchain",
];

export type PaperVenueTier =
  | "transcendent"
  | "top"
  | "flagship"
  | "solid"
  | "workshop"
  | "outside";

export const PAPER_VENUE_TIERS: PaperVenueTier[] = [
  "transcendent",
  "top",
  "flagship",
  "solid",
  "workshop",
  "outside",
];

export const VENUE_TIER_LABELS: Record<PaperVenueTier, string> = {
  transcendent: "Extraordinary",
  top: "Top venue",
  flagship: "Flagship",
  solid: "Solid",
  workshop: "Workshop",
  outside: "Unranked",
};

export type PaperSortMode = "impact" | "yearDesc" | "yearAsc";

const VENUE_TIER_RANK: Record<PaperVenueTier, number> = {
  transcendent: 0,
  top: 1,
  flagship: 2,
  solid: 3,
  workshop: 4,
  outside: 5,
};

function paperYear(paper: TaggedPaper): number {
  const year = Number.parseInt(paper.year ?? "", 10);
  return Number.isFinite(year) ? year : 0;
}

export function sortPapers(
  papers: TaggedPaper[],
  mode: PaperSortMode,
): TaggedPaper[] {
  return [...papers].sort((a, b) => {
    const yearA = paperYear(a);
    const yearB = paperYear(b);
    const impactA = VENUE_TIER_RANK[a.venueTier];
    const impactB = VENUE_TIER_RANK[b.venueTier];

    if (mode === "yearDesc") {
      if (yearB !== yearA) return yearB - yearA;
      if (impactA !== impactB) return impactA - impactB;
    } else if (mode === "yearAsc") {
      if (yearA !== yearB) return yearA - yearB;
      if (impactA !== impactB) return impactA - impactB;
    } else {
      if (impactA !== impactB) return impactA - impactB;
      if (yearB !== yearA) return yearB - yearA;
    }

    return a.title.localeCompare(b.title);
  });
}

export type TaggedPaper = PaperRecord & {
  tags: PaperTag[];
  venueTier: PaperVenueTier;
  blurb?: string;
  noteSlug?: string;
};

const TAG_RULES: { tag: PaperTag; tests: RegExp[] }[] = [
  {
    tag: "marl",
    tests: [
      /multi-?agent/,
      /multiagent/,
      /\bmarl\b/,
      /\bmaddpg\b/,
      /\bmappo\b/,
      /\bqmix\b/,
      /\bcoma\b/,
      /\bvdn\b/,
      /\bsmac/,
      /pettingzoo/,
      /melting pot/,
      /\broma\b/,
      /\brode\b/,
      /\bqplex\b/,
      /\bmaven\b/,
      /benchmarl/,
      /tleague/,
      /\bpsro\b/,
      /other-play/,
      /ad hoc teamwork/,
      /cooperative-competitive/,
      /cooperative multi-agent/,
      /many-world/,
      /off-belief/,
      /zero-shot coordination/,
    ],
  },
  {
    tag: "rl",
    tests: [
      /reinforcement/,
      /q-learning/,
      /\bppo\b/,
      /\bdqn\b/,
      /\bdqfd\b/,
      /\brl\b/,
      /policy gradient/,
      /self-play/,
      /offline reinforcement/,
      /population based training/,
      /\bnfsp\b/,
      /option-critic/,
      /feudal/,
      /reward shap/,
      /decision transformer/,
      /curriculum learning/,
      /open-ended learning/,
      /off-belief/,
    ],
  },
  {
    tag: "games",
    tests: [
      /counter-strike/,
      /cs:go/,
      /csgo/,
      /esports/,
      /dota/,
      /starcraft/,
      /\bmoba\b/,
      /gran turismo/,
      /vizdoom/,
      /\bdoom\b/,
      /football/,
      /hanabi/,
      /honor of kings/,
      /werewolf/,
      /diplomacy/,
      /overcooked/,
      /tactical shooter/,
      /video game/,
    ],
  },
  {
    tag: "imitation",
    tests: [
      /imitation/,
      /behavioural cloning/,
      /behavioral cloning/,
      /dagger/,
      /\bgail\b/,
      /demonstration/,
      /\bvpt\b/,
      /video pretraining/,
      /learning to (act|move)/,
    ],
  },
  {
    tag: "llm",
    tests: [
      /language model/,
      /\bllm\b/,
      /transformer/,
      /attention is all you need/,
      /diplomacy/,
      /werewolf/,
      /\bgato\b/,
      /generalist agent/,
    ],
  },
  {
    tag: "blockchain",
    tests: [
      /bitcoin/,
      /ethereum/,
      /smart contract/,
      /peer-to-peer electronic cash/,
      /nakamoto/,
      /szabo/,
      /blockchain/,
    ],
  },
  {
    tag: "eval",
    tests: [
      /evaluat/,
      /benchmark/,
      /survey/,
      /critique/,
      /precipice/,
      /protocol/,
      /revisiting/,
      /that matters/,
    ],
  },
  {
    tag: "comm",
    tests: [/communicat/, /\bdial\b/, /commnet/, /tarmac/, /callout/],
  },
  {
    tag: "deception",
    tests: [
      /decept/,
      /deceiv/,
      /adversarial polic/,
      /theory of mind/,
      /\btom\b/,
      /hidden role/,
      /superstition/,
      /modelling other/,
      /modeling other/,
      /off-belief/,
      /asymmetric information/,
    ],
  },
  {
    tag: "hierarchy",
    tests: [
      /hierarch/,
      /feudal/,
      /option-critic/,
      /semi-?mdp/,
      /temporal abstraction/,
      /affordance/,
      /goal-based/,
      /goal-conditioned/,
      /macromanag/,
      /macro strategy/,
      /econom/,
      /reward shap/,
      /long horizon/,
      /multi-objective/,
    ],
  },
  {
    tag: "pomdp",
    tests: [
      /partial(?:ly)? observ/,
      /\bpomdp/,
      /recurrent q/,
      /\bdrqn\b/,
      /vizdoom/,
      /listen/,
      /perceptual/,
      /human-like agent/,
    ],
  },
];

export function inferPaperTags(paper: PaperRecord): PaperTag[] {
  const haystack = [paper.id, paper.short, paper.title, paper.venue, paper.authors]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const tags = TAG_RULES.filter(({ tests }) =>
    tests.some((test) => test.test(haystack)),
  ).map(({ tag }) => tag);

  if (tags.length === 0) {
    return ["rl"];
  }
  return tags;
}

const TRANSCENDENT_IDS = new Set([
  "nakamoto2008bitcoin",
  "szabo1996smartcontracts",
  "vaswani2017attention",
  "vinyals2019alphastar",
  "berner2019dota",
  "wurman2022gt",
  "cicero2022diplomacy",
  "jaderberg2019ftw",
]);

export function inferPaperVenue(paper: PaperRecord): PaperVenueTier {
  if (TRANSCENDENT_IDS.has(paper.id)) {
    return "transcendent";
  }

  const haystack = `${paper.venue ?? ""} ${paper.title}`.toLowerCase();

  if (/\bnature\b|\bscience\b/.test(haystack)) {
    return "transcendent";
  }
  if (
    /workshop|symposium|datasets and benchmarks/.test(haystack)
  ) {
    return "workshop";
  }
  if (/neurips|\bnips\b|icml|iclr|\bjmlr\b|journal of machine learning/.test(haystack)) {
    return "top";
  }
  if (
    /aaai|aamas|www|siggraph|aistats|ijcai|artificial intelligence|computer graphics forum|autonomous agents and multi-agent/.test(
      haystack,
    )
  ) {
    return "flagship";
  }
  if (
    /\bcog\b|\bcig\b|big data|\bwsc\b|ijcnn|applied sciences|chi play|human-computer interaction|i\/itsec|winter simulation/.test(
      haystack,
    )
  ) {
    return "solid";
  }
  if (
    !paper.venue ||
    /white paper|extropy|school of|thesis|arxiv/.test(haystack)
  ) {
    return "outside";
  }
  return "outside";
}

export function withPaperTags(
  papers: PaperRecord[] = READ_PAPERS,
  options?: { locale?: string; noteByPaperId?: Record<string, string> },
): TaggedPaper[] {
  return papers.map((paper) => ({
    ...paper,
    tags: inferPaperTags(paper),
    venueTier: inferPaperVenue(paper),
    blurb: options?.locale ? getPaperBlurb(paper.id, options.locale) : undefined,
    noteSlug: paper.noteSlug ?? options?.noteByPaperId?.[paper.id],
  }));
}
