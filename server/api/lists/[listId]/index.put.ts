import { zh } from "h3-zod";
import ListSchema from "~/schemas/List.schema";
import { List } from "~/server/models/List";

export default defineEventHandler(async (event) => {
  const listId = getRouterParam(event, "listId");
  const user = event.context.user;

  const body = await zh.useValidatedBody(event, ListSchema.partial());

  const updatedLists = await List.findOneAndUpdate(
    { _id: listId, owner: user._id },
    {
      $set: body,
    },
    {
      new: true,
    }
  );

  if (!updatedLists) {
    throw createError({
      statusCode: 404,
      message: "List not found",
    });
  }

  return updatedLists;
});
