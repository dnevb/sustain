import type { FastifyPluginAsync } from "fastify";
import { nanoid } from "nanoid";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Ticket } from "../../models/ticket.js";
import { User } from "../../models/user.js";
import accessTo from "../../utils/accessTo.js";

const body = z.object({
  summary: z.string(),
  description: z.string(),
});

const ticketCreateRoute: FastifyPluginAsync = async (app) => {
  app.route({
    url: "",
    method: "POST",
    onRequest: [accessTo(["client"])],
    schema: {
      body: zodToJsonSchema(body),
    },
    handler: async (req) => {
      const values = body.parse(req.body);
      const assigned_to = await User.getRandom();

      const data = {
        ...values,
        id: nanoid(8),
        priority: 1,
        assigned_to: assigned_to,
        requested_by: req.user,
      };
      const res = await Ticket.insert(data);

      return { ...data, ...res.generatedMaps.at(0) };
    },
  });
};

export default ticketCreateRoute;
