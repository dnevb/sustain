import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { User } from "../../models/user.js";

const body = z.object({
  email: z.string().email(),
  password: z.string(),
  first_name: z.string(),
  last_name: z.string(),
});

const signupRoute: FastifyPluginAsync = async (app) => {
  app.route({
    url: "/signup",
    method: "POST",
    schema: {
      tags: ["auth"],
      body: zodToJsonSchema(body),
    },
    handler: async (req) => {
      const values = body.parse(req.body);

      const exists = await User.getByEmail(values.email);
      if (exists) return app.httpErrors.unauthorized();

      const user = await User.create({
        ...values,
        display_name: `${values.first_name} ${values.last_name}`,
      });

      const payload = {
        ...user,
        password: undefined,
      };
      const token = app.jwt.sign(payload);

      return { token, user: payload };
    },
  });
};

export default signupRoute;
