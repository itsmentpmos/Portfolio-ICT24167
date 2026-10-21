/**
 * Cloudflare Pages Functions: /api/certificates
 * Handles CRUD operations with Cloudflare D1 Database
 */

export async function onRequestGet(context) {
  const { env } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const { results } = await env.DB.prepare("SELECT * FROM certificates ORDER BY issue_date DESC").all();
    const formatted = results.map(row => ({
      id: row.id,
      title: { th: row.title_th, en: row.title_en },
      issuer: { th: row.issuer_th, en: row.issuer_en },
      date: row.issue_date,
      credentialId: row.credential_id,
      description: { th: row.description_th, en: row.description_en },
      pdfR2Key: row.pdf_r2_key,
      pdfFilename: row.pdf_filename,
      createdAt: row.created_at
    }));

    return new Response(JSON.stringify({ success: true, data: formatted }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "D1 Database binding 'DB' not configured" }), { status: 500 });
  }

  try {
    const body = await request.json();
    const id = body.id || `cert-${Date.now()}`;
    const titleTh = body.title?.th || body.title || '';
    const titleEn = body.title?.en || titleTh;
    const issuerTh = body.issuer?.th || body.issuer || '';
    const issuerEn = body.issuer?.en || issuerTh;
    const issueDate = body.date || '';
    const credentialId = body.credentialId || null;
    const descTh = body.description?.th || body.description || '';
    const descEn = body.description?.en || descTh;
    const pdfKey = body.pdfR2Key || null;
    const pdfName = body.pdfFilename || null;

    const query = `
      INSERT INTO certificates (id, title_th, title_en, issuer_th, issuer_en, issue_date, credential_id, description_th, description_en, pdf_r2_key, pdf_filename)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await env.DB.prepare(query).bind(
      id, titleTh, titleEn, issuerTh, issuerEn, issueDate, credentialId, descTh, descEn, pdfKey, pdfName
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400 });
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
    // Optionally remove R2 object if exists
    if (env.PORTFOLIO_BUCKET) {
      const cert = await env.DB.prepare("SELECT pdf_r2_key FROM certificates WHERE id = ?").bind(id).first();
      if (cert && cert.pdf_r2_key) {
        await env.PORTFOLIO_BUCKET.delete(cert.pdf_r2_key);
      }
    }

    await env.DB.prepare("DELETE FROM certificates WHERE id = ?").bind(id).run();
    return new Response(JSON.stringify({ success: true, deleted: id }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
