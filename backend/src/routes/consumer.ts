import express, { Request, Response } from "express";
import {
  Fitting,
  IFitting,
  IProgress,
  Message,
  Progress,
  User,
} from "../models";
import { HistoryModel, IHistory } from "../models/FittingHistory";
import { FittingRequestModel, IRequest } from "../models/FittingRequests";
import { ISchedule, Schedule } from "../models/FittingSchedule";
import { Status } from "../models/Fitting";

const router = express.Router();

router.get(
  "/getting-started",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await Message.findOne();
      res.send({
        message: result?.message,
      });
      return;
    } catch (error) {}
  }
);
router.get(
  "/get-consumers",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await User.find({
        role: "consumer",
      }).select("-password");
      res.send(result);
      return;
    } catch (error) {}
  }
);

router.get(
  "/fittings/:username",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const fittings = await Fitting.find({
        customerName: req.params.username,
      });
      res.send(fittings);
      return;
    } catch (error) {
      res.status(500).send({ message: "Error fetching fittings" });
      return;
    }
  }
);
router.put(
  "/profile/:id",
  async (req: Request, res: Response): Promise<void> => {
    const updates = req.body;

    try {
      const user = await User.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      }).select("-password");
      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      } else {
        res.send(user);
        return;
      }
    } catch (error) {
      res.status(500).send({ message: "Error updating user profile" });
      return;
    }
  }
);
router.post("/schedule", async (req: Request, res: Response) => {
  const fitting: IFitting = new Fitting({
    customerName: req.body.customerName,
    email: req.body.email,
    phone: req.body.phone,
    fittingType: req.body.fittingType,
    date: req.body.date,
    time: req.body.time,
    status: Status.Submitted,
    comments: req.body.comments,
  });
  await fitting.save();

  const progress: IProgress = new Progress({
    fittingId: fitting._id,
    steps: { Submitted: true },
  });

  const task: IHistory = new HistoryModel({
    customerName: req.body.customerName,
    date: req.body.date,
    fittingId: fitting._id,
    status: Status.Submitted,
    completedAt: req.body.date,
  });

  const request: IRequest = new FittingRequestModel({
    date: req.body.date,
    time: Date.now(),
    customerName: req.body.customerName,
    fittingId: fitting._id,
    email: req.body.email,
    phone: req.body.phone,
    receivedAt: Date.now(),
    status: Status.Submitted,
  });

  const schedule: ISchedule = new Schedule({
    fittingId: fitting._id,
    date: req.body.date,
    time: req.body.time,
    customerName: req.body.customerName,
    status: Status.Submitted,
  });

  await Promise.all([
    progress.save(),
    task.save(),
    request.save(),
    schedule.save(),
  ]);

  const [
    retrievedProgress,
    retrievedTask,
    retrievedRequest,
    retrievedSchedule,
  ] = await Promise.all([
    Progress.findOne({ fittingId: fitting._id }),
    HistoryModel.findOne({ fittingId: fitting._id }),
    FittingRequestModel.findOne({ fittingId: fitting._id }),
    Schedule.findOne({ fittingId: fitting._id }),
  ]);

  if (
    !retrievedProgress ||
    !retrievedTask ||
    !retrievedRequest ||
    !retrievedSchedule
  ) {
    console.error("One or more objects were not saved or retrieved properly.");
  } else {
    console.log("All related objects saved and verified successfully.");
  }

  res.status(201).send(fitting);
  return;
});
export default router;
