import Produce from "../models/produce.model.js";
import { produceValidator } from "../validators/produce.validator.js";
import User from "../models/user.models.js"

export default class produceController {
  static async addProduce(req, res) {

    const { error } = produceValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    try {
      const userId = req.user._id;
      console.log(userId);

      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }

      const existingProduce = await Produce.findOne({produceName: req.body.produceName, farmer: userId});

      if (existingProduce) {
        return res
          .status(409)
          .json({ status: "failed", message: "Produce already exists for this user" });
      }

      const { produceName, quantity } = req.body;

      const newProduce = new Produce({
        produceName,
        quantity,
        farmer: userId,
      });

      const savedProduce = await newProduce.save();

      user.produce.push(savedProduce._id);
      await user.save();

      res.status(201).json({
        status: "success",
        message: "Produce listing added successfully",
        data: savedProduce,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        message: "Internal server error",
      });
    }
  }





  // get produce
  static async getProduce(req, res) {
    try {

      const userId = req.params.userId
      console.log(userId);

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const produceList = await Produce.find({ farmer: req.user._id });
      
      res.status(200).json({
        status: "success",
        message: "Produce listings retrieved successfully",
        data: produceList,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        message: "Internal server error",
      });
    }
  }





  // update produce
  static async updateProduce(req, res) {
    try {
      const userId = req.params.userId;
      const produceId = req.params.produceId; 

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the produce item exists
      const existingProduce = await Produce.findOne({ _id: produceId, farmer: userId });
      if (!existingProduce) {
        return res.status(404).json({ error: "Produce item not found for the specified farmer" });
      }

      const { produceName, quantity } = req.body;

      existingProduce.produceName = produceName;
      existingProduce.quantity = quantity;

      const updatedProduce = await existingProduce.save();

      res.status(200).json({
        status: "success",
        message: "Produce listing updated successfully",
        data: updatedProduce,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        message: "Internal server error",
      });
    }
  }





  // delete produce
  static async deleteProduce(req, res) {
    try {
      const userId = req.params.userId;
      const produceId = req.params.produceId; 

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the produce item exists
      const existingProduce = await Produce.findOne({ _id: produceId, farmer: userId });
      if (!existingProduce) {
        return res.status(404).json({ error: "Produce item not found for the specified farmer" });
      }

      // Remove the produce item
      await Produce.deleteOne({ _id: produceId, farmer: userId });

      // Remove the produce item from the user's produce array
      await User.findByIdAndUpdate(userId, { $pull: { produce: produceId } });

      res.status(200).json({
        status: "success",
        message: "Produce deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "failed",
        message: "Internal server error",
      });
    }
  }
}
