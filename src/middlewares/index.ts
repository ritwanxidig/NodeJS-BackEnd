import { getBySessionToken } from "../db/users";
import express from "express";
import { get, merge } from "lodash";

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
