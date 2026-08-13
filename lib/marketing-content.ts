export type Feature = {
  title: string;
  benefit: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type Benefit = {
  title: string;
  description: string;
  icon: "campaign" | "encounter" | "local";
};

export const benefits = [
  {
    title: "Prepare everything in one place.",
    description: "Connect campaigns, locations, NPCs, encounters, notes, and maps without scattering prep across tabs.",
    icon: "campaign",
  },
  {
    title: "Run encounters without breaking momentum.",
    description: "Keep initiative, hit points, armor class, and conditions visible while the table stays moving.",
    icon: "encounter",
  },
  {
    title: "Keep campaign data local and under your control.",
    description: "Ordinary campaign records stay on the device, with backups you control.",
    icon: "local",
  },
] satisfies readonly Benefit[];

export const features: Feature[] = [
  {
    title: "Campaign organization",
    benefit: "Keep the people, places, and sessions of a campaign connected.",
    description: "Build a campaign roster, organize locations, and keep related NPCs, encounters, and notes within reach when the table takes an unexpected turn.",
    image: "/images/screenshots/campaign.png",
    imageAlt: "Infernal Codex campaign overview showing party and location information.",
  },
  {
    title: "Encounter tracking",
    benefit: "Keep combat moving without losing the current turn.",
    description: "Track initiative, hit points, armor class, and conditions in one focused encounter view that saves progress as the fight changes.",
    image: "/images/screenshots/encounter.png",
    imageAlt: "Infernal Codex encounter runner showing initiative and combatant status.",
  },
  {
    title: "Rules and monsters",
    benefit: "Find the rule or creature you need without opening another book.",
    description: "Search the bundled offline rules reference and monster bestiary, filter sources, and keep commonly needed combat guidance close at hand.",
    image: "/images/screenshots/rules.png",
    imageAlt: "Infernal Codex offline rules browser with searchable categories.",
  },
  {
    title: "NPCs, notes, and maps",
    benefit: "Capture campaign details before they disappear between sessions.",
    description: "Record memorable NPCs, search Markdown notes, and attach map images or links so the information behind the adventure stays organized.",
    image: "/images/screenshots/notes.png",
    imageAlt: "Infernal Codex searchable campaign notes displayed as cards.",
  },
  {
    title: "Backup and restore",
    benefit: "Take control of your campaign archive.",
    description: "Export the app's local campaign records and map images into a backup, then restore them when moving to another supported Android device.",
    image: "/images/screenshots/dashboard.png",
    imageAlt: "Infernal Codex dashboard providing access to campaign tools.",
  },
  {
    title: "Optional Pro AI tools",
    benefit: "Ask for help only when you choose to use it.",
    description: "Generate NPC ideas, prepare summaries, or review a PDF import through optional Pro actions. Ordinary campaign organization remains usable without invoking AI.",
    image: "/images/screenshots/npc-ai.png",
    imageAlt: "Infernal Codex NPC editor showing optional AI suggestion controls.",
  },
];
