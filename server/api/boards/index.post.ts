import { useValidatedBody } from "h3-zod";
import BoardSchema from "~/schemas/Board.schema";
import { Board } from "~/server/models/Board";
import type { UserDocument } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, BoardSchema);
  const user = event.context.user as UserDocument;

  const board = await Board.create({
    ...body,
    owner: user._id,
  });

  return board;
});
