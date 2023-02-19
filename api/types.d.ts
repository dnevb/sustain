import type { DataSource } from "typeorm";

export module "fastify" {
  interface FastifyInstance {
    ds: DataSource;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: any;
    payload: any;
  }
}
