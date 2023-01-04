import { Request, Response } from "express";
import { getCurrentUser } from "../../../twitter/tweet";


export const getUserDetails = (req: Request, res: Response) => {
  getCurrentUser().then((data) => {
    res.send({ user: data})
  }).catch((error) => {
    res.status(500).send({ error });
  });
};