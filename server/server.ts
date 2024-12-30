import express from "express";
import bodyParser from "body-parser";
import next from "next";
import logger from "./logger";
import { fetchDailyData } from "./service/60s";
const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const jsonParser = bodyParser.json();

app.prepare().then(async () => {
  const server = express();

  server.post("/api/daily", jsonParser, async (_, res) => {
    await fetchDailyData()
      .then((data) => {
        res.status(200).json({ code: 200, msg: "success", data: data });
      })
      .catch((err) => {
        logger.error(err);
        res.status(500).json({ code: 500, msg: "Internal Server Error" });
      });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    logger.info(`Ready on http://localhost:${port}`);
  });
});
