import { NextRequest, NextResponse } from "next/server";
import { putJsonContent } from "@/lib/github";

const SECTIONS = ["projects", "stack", "values", "socials", "certs", "site"] as const;
type Section = (typeof SECTIONS)[number];

function isSection(s: string): s is Section {
  return (SECTIONS as readonly string[]).includes(s);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!isSection(section)) {
    return NextResponse.json({ error: "Unknown section." }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  if (body === null) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    await putJsonContent(section, body, `Update ${section} via admin panel`);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to commit to GitHub." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
