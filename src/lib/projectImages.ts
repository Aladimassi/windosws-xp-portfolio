export function projectImageUrl(github: string): string {
  const repo = github.replace(/\/$/, "").split("/").pop() ?? "portfolio";
  return `https://opengraph.githubassets.com/1/Aladimassi/${repo}`;
}
