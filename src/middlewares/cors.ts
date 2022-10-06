import { Request, Response } from "express";

export function rafi_cors(req: Request, res: Response, next) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": process.env.CLIENT_URL,
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, content-type",
  };

  res.set(corsHeaders);
  next();
}
