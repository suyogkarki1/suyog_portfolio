const API = "https://api.github.com";

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function headers() {
  return {
    Authorization: `Bearer ${env("GITHUB_TOKEN")}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export interface GithubFile {
  contentDecoded: string;
  sha: string;
}

/** Fetches a file's current content + sha, or null if it doesn't exist yet. */
export async function getFile(path: string): Promise<GithubFile | null> {
  const repo = env("GITHUB_REPO");
  const branch = env("GITHUB_BRANCH");
  const res = await fetch(
    `${API}/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`,
    { headers: headers(), cache: "no-store" }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub getFile failed (${res.status}): ${await res.text()}`);
  const json = await res.json();
  return { contentDecoded: Buffer.from(json.content, "base64").toString("utf-8"), sha: json.sha };
}

/** Creates or updates a file with base64-encoded content, committing to GITHUB_BRANCH. */
export async function putFile(
  path: string,
  contentBase64: string,
  sha: string | undefined,
  message: string
): Promise<void> {
  const repo = env("GITHUB_REPO");
  const branch = env("GITHUB_BRANCH");
  const res = await fetch(`${API}/repos/${repo}/contents/${path}`, {
    method: "PUT",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ message, content: contentBase64, branch, ...(sha ? { sha } : {}) }),
  });
  if (!res.ok) throw new Error(`GitHub putFile failed (${res.status}): ${await res.text()}`);
}

/** Writes JSON content to content/{section}.json, fetching the current sha first. */
export async function putJsonContent(section: string, data: unknown, message: string): Promise<void> {
  const path = `content/${section}.json`;
  const existing = await getFile(path);
  const contentBase64 = Buffer.from(JSON.stringify(data, null, 2) + "\n", "utf-8").toString("base64");
  await putFile(path, contentBase64, existing?.sha, message);
}
