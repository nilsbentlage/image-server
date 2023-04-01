import express from "express";
import log from "./util.js";
import { ImageRequest } from "./ImageRequest";
import type { FillMode } from "./ImageRequest";

const app = express();
const port = 3000;

app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/:imageName(*)", async (req, res) => {
  const begin = new Date().getMilliseconds();
  const imageName = req.params.imageName;
  const fillMode = req.query.mode as FillMode;
  const request = new ImageRequest(imageName, fillMode);

  await request.serveImage(res);

  const end = new Date().getMilliseconds();

  log(`Handled Request: ${imageName} in ${end - begin}ms`);
});

app.listen(port, () => {
  log(`P.I.C.S listening on port ${port}`);
});
