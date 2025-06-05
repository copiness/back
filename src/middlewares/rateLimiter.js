import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redis from "../config/redis.js";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: "⏱️ Too many requests, please try again in a minute.",
  store: new RedisStore({
    sendCommand: (...args) => redis.sendCommand(args),
  }),
});

export default limiter;
