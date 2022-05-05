import fastify from "fastify";
import helmet from "fastify-helmet";
import multer from "fastify-multer";
import fastifyStatic from "@fastify/static";
import path from "path";
import cors from "fastify-cors";

const __dirname = path.resolve();

import routes from "../routes/routes.js";

const app = fastify({
  logger: true,
});

app.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

app.register(cors, {
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
});

app.register(multer.contentParser);
app.register(helmet);
app.register(routes);

export default app;
