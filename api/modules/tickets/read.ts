import type { FastifyPluginAsync } from "fastify";
import { In, Not } from "typeorm";
import { Ticket } from "../../models/ticket.js";
import accessTo from "../../utils/accessTo.js";

const ticketListRoute: FastifyPluginAsync = async (app) => {
  app.route({
    url: "",
    method: "GET",
    onRequest: [accessTo(["client", "technician"])],
    handler: async (req) => {
      const user = req.user;
      return Ticket.findBy({
        [user["role"] == "client" ? "requested_by" : "assigned_to"]: {
          id: user["id"],
        },
        status: Not(In(["canceled", "completed"])),
      });
    },
  });
  app.route<{ Params: { id: string } }>({
    url: "/:id",
    method: "GET",
    onRequest: [accessTo(["client", "technician"])],
    schema: {
      params: { id: { type: "string" } },
    },
    handler: async (req) => {
      const user = req.user;
      const ticket = await Ticket.findOneBy({ id: req.params.id });

      if (
        [ticket?.assigned_to.id, ticket?.requested_by.id].includes(
          user["id"]
        )
      )
        return app.httpErrors.unauthorized();

      return ticket;
    },
  });
};

export default ticketListRoute;
