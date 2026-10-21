/**
 * Cloudflare Pages Functions: /api/projects
 * Handles CRUD operations with Cloudflare D1 Database
 */

export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const category = url.searchParams.get('category');

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    let query = "SELECT * FROM projects ORDER BY created_at DESC";
    let stmt = env.DB.prepare(query);

    if (category && category !== 'all') {
      query = "SELECT * FROM projects WHERE category = ? ORDER BY created_at DESC";
      stmt = env.DB.prepare(query).bind(category);
    }

    const { results } = await stmt.all();
    const formatted = results.map(row => ({
      id: row.id,
      title: { th: row.title_th, en: row.title_en },
      category: row.category,
      description: { th: row.description_th, en: row.description_en },
      tech: row.tech_json ? JSON.parse(row.tech_json) : [],
      demoUrl: row.demo_url,
      githubUrl: row.github_url,
      imageR2Key: row.image_r2_key,
      createdAt: row.created_at
    }));

    return new Response(JSON.stringify({ success: true, data: formatted }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not configured" }), { status: 500 });
  }

  try {
    const body = await request.json();
    const id = body.id || `proj-${Date.now()}`;
    const titleTh = body.title?.th || body.title || '';
    const titleEn = body.title?.en || titleTh;
    const category = body.category || 'fullstack';
    const descTh = body.description?.th || body.description || '';
    const descEn = body.description?.en || descTh;
    const techJson = JSON.stringify(Array.isArray(body.tech) ? body.tech : []);
    const demoUrl = body.demoUrl || '';
    const githubUrl = body.githubUrl || '';
    const imageKey = body.imageR2Key || null;

    const query = `
      INSERT INTO projects (id, title_th, title_en, category, description_th, description_en, tech_json, demo_url, github_url, image_r2_key)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await env.DB.prepare(query).bind(
      id, titleTh, titleEn, category, descTh, descEn, techJson, demoUrl, githubUrl, imageKey
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPut(context) {
  const { env, request } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not configured" }), { status: 500 });
  }

  try {
    const body = await request.json();
    if (!body.id) {
      return new Response(JSON.stringify({ error: "Missing project id" }), { status: 400 });
    }

    const titleTh = body.title?.th || body.title;
    const titleEn = body.title?.en || titleTh;
    const techJson = body.tech ? JSON.stringify(body.tech) : null;

    const query = `
      UPDATE projects SET
        title_th = COALESCE(?, title_th),
        title_en = COALESCE(?, title_en),
        category = COALESCE(?, category),
        description_th = COALESCE(?, description_th),
        description_en = COALESCE(?, description_en),
        tech_json = COALESCE(?, tech_json),
        demo_url = COALESCE(?, demo_url),
        github_url = COALESCE(?, github_url),
        image_r2_key = COALESCE(?, image_r2_key)
      WHERE id = ?
    `;

    await env.DB.prepare(query).bind(
      titleTh, titleEn, body.category, body.description?.th, body.description?.en,
      techJson, body.demoUrl, body.githubUrl, body.imageR2Key, body.id
    ).run();

    return new Response(JSON.stringify({ success: true, updated: body.id }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}

export async function onRequestDelete(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing 'id' parameter" }), { status: 400 });
  }

  try {
    await env.DB.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();
    return new Response(JSON.stringify({ success: true, deleted: id }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
