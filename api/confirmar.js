export const config = { runtime: 'edge' };

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_TEAM     = 'mariana.silva@xptoinc.com.br';
const EMAIL_FROM     = 'XPTO inc. <eventos@xptoinc.com.br>';

async function sendEmail({ to, subject, html }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: EMAIL_FROM, to, subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
  return res.json();
}

function intoleranceLabel(key) {
  const map = {
    gluten: '🌾 Glúten',
    lactose: '🥛 Lactose',
    vegetariano: '🥗 Vegetariano',
    vegano: '🌱 Vegano',
    frutos_mar: '🦐 Frutos do Mar',
    amendoim: '🥜 Amendoim',
  };
  return map[key] || key;
}

function emailConvidado(nome, pessoas, intolerances, obs) {
  const intolHtml = intolerances.length
    ? `<p style="margin:0 0 6px;color:#999;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Restrições registradas</p>
       <p style="margin:0 0 20px;color:#fff;font-size:15px;">${intolerances.map(intoleranceLabel).join(' &nbsp;|&nbsp; ')}</p>`
    : '';
  const obsHtml = obs
    ? `<p style="margin:0 0 6px;color:#999;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Observação</p>
       <p style="margin:0 0 20px;color:#fff;font-size:15px;">${obs}</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;padding:40px 16px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border:1px solid rgba(0,211,228,.25);border-radius:8px;overflow:hidden;">
        <tr>
          <td style="background:linear-gradient(135deg,#0a0a0a,#001a20);padding:32px 40px;text-align:center;border-bottom:2px solid #00d3e4;">
            <p style="margin:0 0 4px;color:#00d3e4;font-size:10px;letter-spacing:4px;text-transform:uppercase;">XPTO inc. convida para</p>
            <p style="margin:0;color:#fff;font-size:42px;font-weight:900;letter-spacing:-1px;line-height:1;">VIDEO-GAME<br/><span style="color:#00d3e4;">+ TELÃO DA COPA</span></p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 24px;color:#fff;font-size:18px;">E aí, <strong>${nome}</strong>! 🎮⚽</p>
            <p style="margin:0 0 24px;color:#aaa;font-size:15px;line-height:1.6;">Sua presença está confirmada. Nos vemos em <strong style="color:#fff">13 de junho às 10:00 AM</strong> para o primeiro jogo do Brasil na Copa, com muito videogame e churrasco!</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(0,211,228,.07);border:1px solid rgba(0,211,228,.2);border-radius:6px;margin-bottom:24px;">
              <tr>
                <td style="padding:20px 24px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="text-align:center;">
                        <p style="margin:0;color:#00d3e4;font-size:32px;font-weight:900;line-height:1;">13.06</p>
                        <p style="margin:4px 0 0;color:#999;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Às 10:00 AM</p>
                      </td>
                      <td style="width:1px;background:rgba(0,211,228,.2);padding:0 20px;"></td>
                      <td style="text-align:center;">
                        <p style="margin:0;color:#fff;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">🍖 Churrasco de</p>
                        <p style="margin:2px 0 0;color:#fff;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Confraternização</p>
                      </td>
                      <td style="width:1px;background:rgba(0,211,228,.2);padding:0 20px;"></td>
                      <td style="text-align:center;">
                        <p style="margin:0;color:#fff;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">${pessoas} ${pessoas === 1 ? 'pessoa' : 'pessoas'}</p>
                        <p style="margin:2px 0 0;color:#00d3e4;font-size:11px;letter-spacing:1px;text-transform:uppercase;">confirmada${pessoas > 1 ? 's' : ''}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            ${intolHtml}
            ${obsHtml}
            <p style="margin:0;color:#555;font-size:12px;text-align:center;letter-spacing:1px;text-transform:uppercase;">Vamos jogar e assistir o jogo juntos 🔥</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 40px;background:#111;border-top:1px solid #222;text-align:center;">
            <p style="margin:0;color:#444;font-size:11px;letter-spacing:1px;">© 2025 XPTO inc. — Local sem cautela de armamento</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function emailTime(nome, email, tipo, pessoas, intolerances, obs) {
  const intolList = intolerances.length
    ? intolerances.map(intoleranceLabel).join(', ')
    : 'Nenhuma';
  const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">
        <tr>
          <td style="background:#00d3e4;padding:20px 32px;">
            <p style="margin:0;color:#000;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">XPTO inc. — Nova confirmação de presença</p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;">
            <p style="margin:0 0 20px;font-size:16px;color:#111;">Nova inscrição recebida em <strong>${now}</strong></p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:6px;overflow:hidden;font-size:14px;">
              <tr style="background:#fafafa;">
                <td style="padding:10px 16px;color:#888;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px;width:40%;">Nome</td>
                <td style="padding:10px 16px;color:#111;">${nome}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;color:#888;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px;border-top:1px solid #eee;">E-mail</td>
                <td style="padding:10px 16px;color:#111;border-top:1px solid #eee;"><a href="mailto:${email}" style="color:#00a0b0;">${email}</a></td>
              </tr>
              <tr style="background:#fafafa;">
                <td style="padding:10px 16px;color:#888;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px;border-top:1px solid #eee;">Tipo</td>
                <td style="padding:10px 16px;color:#111;border-top:1px solid #eee;text-transform:capitalize;">${tipo}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;color:#888;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px;border-top:1px solid #eee;">Pessoas</td>
                <td style="padding:10px 16px;color:#111;border-top:1px solid #eee;">${pessoas}</td>
              </tr>
              <tr style="background:#fafafa;">
                <td style="padding:10px 16px;color:#888;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px;border-top:1px solid #eee;">Intolerâncias</td>
                <td style="padding:10px 16px;color:#111;border-top:1px solid #eee;">${intolList}</td>
              </tr>
              ${obs ? `<tr>
                <td style="padding:10px 16px;color:#888;font-weight:600;text-transform:uppercase;font-size:11px;letter-spacing:1px;border-top:1px solid #eee;">Observação</td>
                <td style="padding:10px 16px;color:#111;border-top:1px solid #eee;">${obs}</td>
              </tr>` : ''}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 32px;background:#fafafa;border-top:1px solid #eee;text-align:center;">
            <p style="margin:0;color:#bbb;font-size:11px;">Sistema de confirmações — XPTO inc. Evento 13.06</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido' }), { status: 400 });
  }

  const { nome, email, tipo, pessoas = 1, 'intolerâncias': intolerances = [], observacoes = '' } = body;

  if (!nome || !email || !tipo) {
    return new Response(JSON.stringify({ error: 'Campos obrigatórios faltando.' }), { status: 400 });
  }

  try {
    await Promise.all([
      sendEmail({
        to: email,
        subject: `${nome}, sua presença está confirmada! 🎮⚽`,
        html: emailConvidado(nome, pessoas, intolerances, observacoes),
      }),
      sendEmail({
        to: EMAIL_TEAM,
        subject: `[Evento 13.06] Nova confirmação: ${nome}`,
        html: emailTime(nome, email, tipo, pessoas, intolerances, observacoes),
      }),
    ]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Erro ao enviar e-mail. Tente novamente.' }), { status: 500 });
  }
}
