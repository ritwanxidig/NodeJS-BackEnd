import express from "express";
import authenticationRouter from "./authenticationRouter";
import userRoutes from "./userRoutes";

const router = express.Router();

export default (): express.Router => {
  userRoutes(router);
  authenticationRouter(router);
  return router;
};
