import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/proxy", async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: "Missing url" });
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (SMART-TV; Linux; webOS) AppleWebKit/537.36",
                "Accept-Language": "hu-HU,hu;q=0.9"
            }
        });

        const body = await response.text();

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");

        res.send(body);
    } catch (err) {
        res.status(500).json({ error: "Proxy failed" });
    }
});

app.listen(PORT, () => {
    console.log("Proxy running on port", PORT);
});
