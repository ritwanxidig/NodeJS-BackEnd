import express from "express";
import { deleteOne, getAll } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getAll();
    if (users.length <= 0)
      return res.status(400).json({ msg: "there is no users" });
    return res.status(200).json({ count: users.length, data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error }).end();
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleteduser = await deleteOne(id);
    return res.status(200).json(deleteduser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
};
