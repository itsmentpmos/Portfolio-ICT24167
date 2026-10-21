/**
 * Cloudflare Pages Functions: /api/profile
 * Manages ICT Student profile data with Cloudflare D1
 */

export async function onRequestGet(context) {
  const { env } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not configured" }), { status: 500 });
  }

  try {
    const row = await env.DB.prepare("SELECT * FROM profile WHERE id = 'main-profile' LIMIT 1").first();
    if (!row) {
      return new Response(JSON.stringify({ error: "Profile not found" }), { status: 404 });
    }

    const formatted = {
      name: { th: row.name_th, en: row.name_en },
      nickname: { th: row.nickname_th, en: row.nickname_en },
      role: { th: row.role_th, en: row.role_en },
      bio: { th: row.bio_th, en: row.bio_en },
      gpax: row.gpax,
      email: row.email,
      phone: row.phone,
      location: { th: row.location_th, en: row.location_en },
      university: { th: row.university_th, en: row.university_en },
      faculty: { th: row.faculty_th, en: row.faculty_en },
      avatarR2Key: row.avatar_r2_key,
      updatedAt: row.updated_at
    };

    return new Response(JSON.stringify({ success: true, data: formatted }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}

export async function onRequestPut(context) {
  const { env, request } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not configured" }), { status: 500 });
  }

  try {
    const body = await request.json();
    const query = `
      UPDATE profile SET
        name_th = COALESCE(?, name_th),
        name_en = COALESCE(?, name_en),
        role_th = COALESCE(?, role_th),
        role_en = COALESCE(?, role_en),
        bio_th = COALESCE(?, bio_th),
        bio_en = COALESCE(?, bio_en),
        gpax = COALESCE(?, gpax),
        email = COALESCE(?, email),
        phone = COALESCE(?, phone),
        avatar_r2_key = COALESCE(?, avatar_r2_key),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 'main-profile'
    `;

    await env.DB.prepare(query).bind(
      body.name?.th, body.name?.en,
      body.role?.th, body.role?.en,
      body.bio?.th, body.bio?.en,
      body.gpax, body.email, body.phone,
      body.avatarR2Key
    ).run();

    return new Response(JSON.stringify({ success: true, message: "Profile updated" }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
