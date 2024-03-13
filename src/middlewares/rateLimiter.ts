import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60000,
  limit: 3,
  message: "Oops! Too many login attempts! Wait for a minute",
  standardHeaders: true,
});
