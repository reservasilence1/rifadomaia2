export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") return res.status(405).json({ error: "Método não permitido" });

  const transactionId = String(req.query.transactionId || "").trim();
  if (!transactionId) return res.status(400).json({ error: "transactionId é obrigatório" });

  try {
    const KEY =
      "1My4WYQuf8PP_UF-pvpYRojXm9LCB8RgoLxWH2FDI9k0s--9LoJdCwx5asVsC2L5kdkMMsHnNaXg4FTi2kTITA";

    const url =
      `https://app.duttyfy.com.br/api-pix/${KEY}?transactionId=` + encodeURIComponent(transactionId);

    const r = await fetch(url);
    const text = await r.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      return res.status(502).json({ error: "Resposta inválida da API", raw: text });
    }

    return res.status(r.status || 200).json(json);
  } catch (e) {
    return res.status(500).json({ error: "Erro ao verificar status" });
  }
}

