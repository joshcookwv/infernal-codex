export const siteConfig = {
  name: "Infernal Codex",
  description:
    "An offline-first campaign toolkit for Dungeon Masters, available on Android with a Windows desktop edition in development.",
  origin: "https://joshcookwv.github.io",
  canonicalBasePath: "/infernal-codex",
  supportEmail: "infernalbuldog@gmail.com",
  githubUrl: "https://github.com/joshcookwv/infernal-codex",
  mobileGithubUrl: "https://github.com/joshcookwv/dm-assistant-mobile",
  privacyUrl: "https://joshcookwv.github.io/dm-assistant-mobile/privacy/",
  licensesUrl: "https://joshcookwv.github.io/dm-assistant-mobile/licenses/",
} as const;

export function withBasePath(pathname: string, basePath: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${basePath}${normalized}`;
}

export function assetPath(pathname: string): string {
  return withBasePath(pathname, process.env.NEXT_PUBLIC_BASE_PATH ?? "");
}

export function absoluteUrl(pathname = "/"): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteConfig.origin}${siteConfig.canonicalBasePath}${normalized}`;
}
