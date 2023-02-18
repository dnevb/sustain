import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { User } from "../../models/user.js";

const body = z.object({
  email: z.string().email(),
  password: z.string(),
});

const signinRoute: FastifyPluginAsync = async (app) => {
  app.route({
    url: "/signin",
    method: "POST",
    schema: {
      tags: ["auth"],
      body: zodToJsonSchema(body),
    },
    handler: async (req) => {
      const values = body.parse(req.body);

      const user = await User.getByEmail(values.email);
      if (!user) return app.httpErrors.unauthorized();
      if (user.password !== values.password)
        return app.httpErrors.unauthorized();

      const payload = {
        ...user,
        password: undefined,
      };
      const token = app.jwt.sign(payload);

      return { token, user: payload };
    },
  });
};

export default signinRoute;
