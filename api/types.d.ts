import type { DataSource } from "typeorm";

export module "fastify" {
  interface FastifyInstance {
    ds: DataSource;
  }
}
