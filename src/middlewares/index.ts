import { getBySessionToken } from "../db/users";
import express from "express";
import { get, identity, merge } from "lodash";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id");
    if (!currentUserId)
      return res
        .status(403)
        .json({ msg: "the current user is not authenticated" })
        .end();
    if (currentUserId !== id)
      return res.status(403).json({ msg: "the current user is not the owner" });

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // check if the request with cookie of session token
  const sessionToken: string = req.cookies["userAuth"];
  if (!sessionToken)
    return res.status(403).json({ msg: "the user is not authenticated" });

  //   check if the session token is owned by existing user
  const existingUser = await getBySessionToken(sessionToken);
  if (!existingUser)
    return res.status(403).json({ msg: "the user is not authenticated" });

  merge(req, { identity: existingUser });

  return next();
};
