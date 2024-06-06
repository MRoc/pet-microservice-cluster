import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/api/users/hello", (req, res) => {
  res.send("Hi there!");
});

router.post(
  "/api/users/signup",
  [
    body("email").isEmail(),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;

    console.log(`Creating user with email ${email}`);

    res.send({});
  }
);

export { router as signupRouter };
