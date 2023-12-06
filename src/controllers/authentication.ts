import express from "express";
import { create, getAll, getByEmail, getByUsername } from "../db/users";
import { random, authentication } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ msg: "username, and password field are required" });
  // checking if the user exists
  const user = await getByUsername(username).select(
    "+authentication.salt +authentication.password"
  );
  if (!user) return res.status(400).send({ msg: "username is incorrect" });

  // check the passwordHash
  const expectedHash = authentication(user.authentication.salt, password);
  if (user.authentication.password !== expectedHash)
    return res.status(403).json({ msg: "Incorrect Password" });

  // making session token
  const salt = random();
  user.authentication.sessionToken = authentication(salt, user._id.toString());

  await user.save();
  res.cookie("userAuth", user.authentication.sessionToken, {
    domain: "localhost",
    path: "/",
  });
  return res.status(200).json(user).end();
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !username || !password) return res.sendStatus(400);

    // if the user exists anyway
    const existWithUsername = await getByUsername(username);
    const existWithEmail = await getByEmail(email);
    if (existWithEmail || existWithUsername)
      return res.status(400).send({ msg: "user with" });

    const salt = random();
    const user = await create({
      email,
      username,
      authentication: { salt, password: authentication(salt, password) },
    });

    return res.status(201).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error });
  }
};
