import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/User";

const router = express.Router();

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      res.status(401).send({ message: "Invalid credentials" });
      return;
    }

    bcrypt.compare(password, user?.password || "", (error, value) => {
      if (error) {
        res.status(500).send({ message: "Internal server error" });
        return;
      }

      if (!value) {
        res.status(401).send({ message: "Invalid credentials" });
        return;
      }

      const token = jwt.sign(
        { id: user?._id, role: user?.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "5 days" }
      );

      res.send({
        token,
        user: {
          email: user.email,
          name: user.name,
          role: user.role,
          id: user._id,
          phone: user?.phone || "000000000",
        },
      });
      return;
    });
  } catch (err) {
    res.status(500).send({ message: "There was an error" });
    return;
  }
});

interface RegisterRequest extends Request {
  body: IUser;
}

// Consumer/Admin Registration Route
router.post("/register", async (req: RegisterRequest, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(req.body);
    // Validate input
    if (!name || !email || !password || !role) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Restrict roles to "consumer" or "admin" only
    if (!["consumer", "admin"].includes(role)) {
      res.status(400).json({ message: "Invalid role specified" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Email is already registered" });
      return;
    }

    // Hash the password
    bcrypt.hash(password, 10, async (error, password) => {
      if (!error) {
        // Create a new user
        const newUser: IUser = new User({
          name,
          email,
          password,
          role,
        });

        await newUser.save();

        // Generate a token
        const token = jwt.sign(
          { id: newUser._id, role: newUser.role },
          process.env.JWT_SECRET as string,
          { expiresIn: "1h" }
        );

        res.status(201).json({
          message: "User registered successfully",
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
          token,
        });
        return;
      } else {
        throw error;
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

export default router;
