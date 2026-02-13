const express = require("express");
const { Pool } = require("pg");
const { Readable } = require("stream");

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const VIDEO_STORAGE_URL = process.env.VIDEO_STORAGE_URL || "http://localhost:4000";

app.get("/videos/:id/stream", async (req, res) => {
  const result = await pool.query("SELECT * FROM videos WHERE id = $1", [req.params.id]);
  if (result.rows.length === 0) {
    return res.status(404).send("Video not found");
  }

  const video = result.rows[0];
  const storageUrl = `${VIDEO_STORAGE_URL}/video?url=${encodeURIComponent(video.url)}`;

  try {
    const response = await fetch(storageUrl);
    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch video");
    }

    res.setHeader("Content-Type", "video/mp4");
    Readable.fromWeb(response.body).pipe(res);
  } catch (err) {
    console.error("Error streaming video:", err);
    res.status(500).send("Error streaming video");
  }
});

app.listen(port, () => {
  console.log(`Video service listening on port ${port}`);
});
