import "reflect-metadata";

import fastifyAutoload from "@fastify/autoload";
import fastifyCors from "@fastify/cors";
import fastifySensible from "@fastify/sensible";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import type { FastifyPluginAsync } from "fastify";
import { join } from "path";
import datasource from "./datasource";
import pkg from "./package.json" assert { type: "json" };
import getDirname from "./utils/dirname";

const __dirname = getDirname(import.meta.url);

const main: FastifyPluginAsync = async (app, opts) => {
  // defaults
  const ds = await datasource.initialize();
  app.decorate("ds", ds);
  app.register(fastifySensible);
  app.register(fastifyCors);

  // swagger
  app.register(fastifySwagger, {
    openapi: {
      info: { title: "Sustain Api", version: pkg.version },
    },
  });
  app.register(fastifySwaggerUi, { routePrefix: "/" });

  // routes
  app.register(fastifyAutoload, {
    dir: join(__dirname, "modules"),
    options: opts,
    autoHooks: true,
    cascadeHooks: true,
    ignorePattern: /schema.js/,
  });
};

export default main;
