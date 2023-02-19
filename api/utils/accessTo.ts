import type { onRequestAsyncHookHandler } from "fastify";

const accessTo =
  (roles: string[]): onRequestAsyncHookHandler =>
  async (req, rep) => {
    try {
      const payload = (await req.jwtVerify()) as any;

      if (!roles.includes(payload["role"])) return rep.unauthorized();
    } catch (e: any) {
      rep.unauthorized(e.message);
    }
  };

export default accessTo;
