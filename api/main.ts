import fastifyAutoload from "@fastify/autoload";
import fastifyCors from "@fastify/cors";
import fastifySensible from "@fastify/sensible";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import type { FastifyPluginAsync } from "fastify";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import pkg from "./package.json" assert { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));

const main: FastifyPluginAsync = async (app, opts) => {
  // defaults
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
