import { deleteUser, getAllUsers, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";
import express from "express";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.put("/users/:id", isAuthenticated, isOwner, updateUser);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
};
