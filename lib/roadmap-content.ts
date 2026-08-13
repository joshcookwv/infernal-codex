export type RoadmapStage = {
  label: "Now" | "Next" | "Later";
  title: string;
  items: readonly string[];
};

export const roadmapStages: readonly RoadmapStage[] = [
  {
    label: "Now",
    title: "Preparing the Android release",
    items: ["Complete production validation", "Publish verified Android availability"],
  },
  {
    label: "Next",
    title: "Improve the released experience",
    items: ["Publish release notes", "Prioritize feedback from Dungeon Masters"],
  },
  {
    label: "Later",
    title: "Build the Windows desktop edition",
    items: ["Modernize the existing desktop foundation", "Share approved development previews"],
  },
] as const;
