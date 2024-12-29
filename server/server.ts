import express from "express";
import bodyParser from "body-parser";
import next from "next";
import logger from "./logger";
import { getDailyData } from "./app";
const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const jsonParser = bodyParser.json();

app.prepare().then(async () => {
  const server = express();

  server.post("/api/daily", jsonParser, async (_, res) => {
    await getDailyData()
      .then((data) => {
        if (data.code !== 200) {
          res.status(data.code).json({ code: data.code, msg: data.msg });
          return;
        }
        res.status(200).json(data.data);
      })
      .catch((err) => {
        res.status(500).json({ error: "Internal Server Error" });
        logger.error(err);
      });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    logger.info(`Ready on http://localhost:${port}`);
  });
});
