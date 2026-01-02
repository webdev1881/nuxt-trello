import SignupSchema from "~/schemas/Signup.schema";
import { User } from "~/server/models/User";
import { Board } from "~/server/models/Board";
import { List } from "~/server/models/List";
import { useValidatedBody } from "h3-zod";

export default defineEventHandler(async (event) => {
  const data = await useValidatedBody(event, SignupSchema);
  const user = await User.create(data);

  // Create a board for the user
  const board = await Board.create({
    name: "Main Board",
    owner: user._id,
    coverImage: "https://picsum.photos/seed/picsum/1200/800",
  });

  const list = await List.create({
    name: "To Do",
    board: board._id,
    owner: user._id,
  });

  board.lists.push(list._id);

  await board.save();

  return user;
});
