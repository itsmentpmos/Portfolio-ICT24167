/**
 * Cloudflare Pages Functions: /api/upload
 * Handles direct binary/multipart file streaming to Cloudflare R2 Storage
 */

export async function onRequestPost(context) {
  const { env, request } = context;

  if (!env.PORTFOLIO_BUCKET) {
    return new Response(JSON.stringify({ 
      error: "Cloudflare R2 Bucket binding 'PORTFOLIO_BUCKET' not configured" 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file");
      const category = formData.get("category") || "assets"; // 'projects', 'certs', 'avatar'

      if (!file || !(file instanceof File)) {
        return new Response(JSON.stringify({ error: "No valid file uploaded" }), { status: 400 });
      }

      const ext = file.name.split('.').pop() || 'bin';
      const key = `${category}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

      // Upload directly into Cloudflare R2
      await env.PORTFOLIO_BUCKET.put(key, file.stream(), {
        httpMetadata: {
          contentType: file.type || "application/octet-stream",
          contentDisposition: `inline; filename="${file.name}"`
        }
      });

      return new Response(JSON.stringify({
        success: true,
        key: key,
        filename: file.name,
        size: file.size,
        contentType: file.type
      }), {
        status: 201,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ error: "Expected multipart/form-data" }), { status: 400 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// Retrieve file from R2
export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (!key) {
    return new Response(JSON.stringify({ error: "Missing 'key' parameter" }), { status: 400 });
  }

  if (!env.PORTFOLIO_BUCKET) {
    return new Response("R2 Bucket not configured", { status: 500 });
  }

  const object = await env.PORTFOLIO_BUCKET.get(key);
  if (!object) {
    return new Response("File not found in R2", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}
