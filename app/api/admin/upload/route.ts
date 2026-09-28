import { NextRequest, NextResponse } from "next/server";
import { getFile, putFile } from "@/lib/github";

const FOLDERS = ["certs", "icons"] as const;
type Folder = (typeof FOLDERS)[number];

const CV_PATH = "public/Suyog_Karki_CV.pdf";

function sanitizeFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/^\.+/, "");
  return base || "file";
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.base64 !== "string") {
    return NextResponse.json({ error: "Invalid upload payload." }, { status: 400 });
  }

  let path: string;
  if (body.target === "cv") {
    path = CV_PATH;
  } else {
    const folder = body.folder as string;
    if (!(FOLDERS as readonly string[]).includes(folder) || typeof body.filename !== "string") {
      return NextResponse.json({ error: "Invalid upload target." }, { status: 400 });
    }
    path = `public/${folder as Folder}/${sanitizeFilename(body.filename)}`;
  }

  try {
    const existing = await getFile(path);
    await putFile(path, body.base64, existing?.sha, `Upload ${path} via admin panel`);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to upload to GitHub." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, publicPath: "/" + path.replace(/^public\//, "") });
}
