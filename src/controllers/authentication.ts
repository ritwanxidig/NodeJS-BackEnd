import express from "express";
import { create, getAll, getByEmail, getByUsername } from "../db/users";
import { random, authentication } from "../helpers";

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


