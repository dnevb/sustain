import type { FastifyPluginAsync } from "fastify";
import { nanoid } from "nanoid";
import { Ticket } from "../../models/ticket.js";
import { TicketComent } from "../../models/ticket_comment.js";
import accessTo from "../../utils/accessTo.js";

const ticketTechRoutes: FastifyPluginAsync = async (app) => {
  app.route<{ Params: { id: string; action: string } }>({
    url: "/:id/accept",
    method: "PATCH",
    onRequest: [accessTo(["technician"])],
    schema: {
      params: { id: { type: "string" } },
    },
    handler: async (req) => {
      const id = req.params.id;

      const ticket = await Ticket.findOneBy({ id });
      if (!ticket) return app.httpErrors.notFound();

      ticket.status = "in_progress";
      await ticket.save();

      await TicketComent.insert({
        id: nanoid(8),
        ticket,
        user: req.user,
        content: `${req.user["display_name"]} accepted the ticket`,
      });

      return Ticket.findOneBy({ id });
    },
  });
  app.route<{ Params: { id: string } }>({
    url: "/:id/complete",
    method: "PATCH",
    onRequest: [accessTo(["technician"])],
    schema: {
      params: { id: { type: "string" } },
    },
    handler: async (req) => {
      const id = req.params.id;

      const ticket = await Ticket.findOneBy({ id });
      if (!ticket) return app.httpErrors.notFound();

      ticket.status = "completed";
      await ticket.save();

      await TicketComent.insert({
        id: nanoid(8),
        ticket: ticket,
        user: req.user,
        content: `${req.user["display_name"]} completed the ticket`,
      });

      return Ticket.findOneBy({ id });
    },
  });

  app.route<{ Params: { id: string } }>({
    url: "/:id/cancel",
    method: "PATCH",
    onRequest: [accessTo(["technician"])],
    schema: {
      params: { id: { type: "string" } },
    },
    handler: async (req) => {
      const id = req.params.id;

      const ticket = await Ticket.findOneBy({ id });
      if (!ticket) return app.httpErrors.notFound();

      ticket.status = "canceled";
      await ticket.save();

      await TicketComent.insert({
        id: nanoid(8),
        ticket: ticket,
        user: req.user,
        content: `${req.user["display_name"]} canceled the ticket`,
      });

      return Ticket.findOneBy({ id });
    },
  });
};

export default ticketTechRoutes;
