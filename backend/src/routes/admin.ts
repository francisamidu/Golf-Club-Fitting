import express, { Request, Response } from "express";
import { Fitting, Message, Progress, User } from "../models";
import { authenticate } from "../middlewares";
import { FittingRequestModel } from "../models/FittingRequests";
import { HistoryModel } from "../models/FittingHistory";
import { Schedule } from "../models/FittingSchedule";
import mongoose from "mongoose";

const router = express.Router({});

router.put(
  "/getting-started",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { message } = req.body;
      await Message.findOneAndUpdate(
        { message },
        { message },
        { new: true, upsert: true }
      );
      if (!res.headersSent) {
        res.send({ message: "The message was successfully updated" });
      }
    } catch (error) {
      if (!res.headersSent) {
        res
          .status(500)
          .send({ message: "Sorry we couldn't update the message. Try again" });
      }
    }
  }
);

router.post(
  "/fittings",
  authenticate,
  async (req: Request, res: Response): Promise<void> => {
    let { status, fittingId: _id } = req.body;
    const fittingId = mongoose.Types.ObjectId.createFromHexString(_id);
    try {
      const fitting = await Fitting.findByIdAndUpdate(
        fittingId,
        { status },
        { new: true }
      );
      const progress = await Progress.findByIdAndUpdate(
        fittingId,
        {
          steps: {
            [status]: true,
          },
        },
        { new: true }
      );
      const _p = await Progress.find();
      console.log(_p);
      const history = await HistoryModel.findByIdAndUpdate(
        fittingId,
        {
          status,
        },
        { new: true }
      );
      const request = await FittingRequestModel.findByIdAndUpdate(
        fittingId,
        {
          status,
        },
        { new: true }
      );
      const schedule = await Schedule.findByIdAndUpdate(
        fittingId,
        { status },
        { new: true }
      );
      if (!fitting) {
        if (!res.headersSent) {
          res.status(404).send({ message: "Fitting not found" });
        }
      } else {
        if (!res.headersSent) {
          res.send({ fitting, progress, history, request, schedule });
        }
      }
    } catch (error) {
      console.log(error);
      if (!res.headersSent) {
        res.status(500).send({ message: "Error updating fitting status" });
      }
    }
  }
);

router.put(
  "/consumer/:id",
  async (req: Request, res: Response): Promise<void> => {
    const updates = req.body;
    try {
      const user = await User.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      }).select("-password");
      if (!user) {
        if (!res.headersSent) {
          res.status(404).send({ message: "User not found" });
        }
      } else {
        if (!res.headersSent) {
          res.send(user);
        }
      }
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).send({ message: "Error updating user profile" });
      }
    }
  }
);

router.get(
  "/getting-started",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await Message.findOne();
      if (!res.headersSent) {
        res.send({ message: result?.message });
      }
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).send({ message: "Error fetching message" });
      }
    }
  }
);

router.get("/fittings", async (_: Request, res: Response): Promise<void> => {
  try {
    const fittings = await Fitting.find();
    if (!res.headersSent) {
      res.send(fittings);
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).send({ message: "Error fetching fittings" });
    }
  }
});

router.get(
  "/fitting-schedule",
  async (_: Request, res: Response): Promise<void> => {
    try {
      const fittings = await Schedule.find();
      if (!res.headersSent) {
        res.send(fittings);
      }
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).send({ message: "Error fetching fittings" });
      }
    }
  }
);

router.get(
  "/fitting-requests",
  async (_: Request, res: Response): Promise<void> => {
    try {
      const fittings = await FittingRequestModel.find();
      if (!res.headersSent) {
        res.send(fittings);
      }
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).send({ message: "Error fetching fittings" });
      }
    }
  }
);

router.get(
  "/fitting-history",
  async (_: Request, res: Response): Promise<void> => {
    try {
      const fittings = await HistoryModel.find();
      if (!res.headersSent) {
        res.send(fittings);
      }
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).send({ message: "Error fetching fittings" });
      }
    }
  }
);

router.get("/schedule", async (req: Request, res: Response): Promise<void> => {
  try {
    const fittings = await Fitting.find({
      status: { $in: ["scheduled", "completed", "requested"] },
    });
    if (!res.headersSent) {
      res.send(fittings);
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).send({ message: "Error fetching fitting schedule" });
    }
  }
});

export default router;
