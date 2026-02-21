import { NextRequest, NextResponse } from "next/server";
import { readFileSync, statSync } from "fs";
import { join } from "path";

export async function GET(request: NextRequest) {
  try {
    // Path to the audio file
    const audioPath = join(process.cwd(), "public", "audio", "dancing-with-your-daughters.m4a");

    // Check if file exists and get stats
    let stat;
    try {
      stat = statSync(audioPath);
    } catch {
      return new NextResponse("Audio file not found", { status: 404 });
    }

    const fileSize = stat.size;
    const range = request.headers.get("range");

    // Handle range requests for seeking support
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      // Read only the requested chunk
      const buffer = Buffer.alloc(chunkSize);
      const fd = require("fs").openSync(audioPath, "r");
      require("fs").readSync(fd, buffer, 0, chunkSize, start);
      require("fs").closeSync(fd);

      return new NextResponse(buffer, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize.toString(),
          "Content-Type": "audio/mp4",
          "Content-Disposition": "inline",
          "X-Content-Type-Options": "nosniff",
          "Cache-Control": "private, no-store",
        },
      });
    }

    // Full file request
    const fileBuffer = readFileSync(audioPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Length": fileSize.toString(),
        "Content-Type": "audio/mp4",
        "Accept-Ranges": "bytes",
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("Audio streaming error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
