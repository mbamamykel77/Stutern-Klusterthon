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

      const existingProduce = await Produce.findOne({produceName: req.body.produceName, user});
      console.log(existingProduce);

      if (existingProduce) {
        return res
          .status(409)
          .json({ status: "failed", message: "Produce already exists for this user" });
      }

      const { produceName, quantity } = req.body;

      const newProduce = new Produce({
        produceName,
        quantity,
        user: userId,
      });
      // console.log("produceName:", produceName);
      // console.log("quantity:", quantity);
      // console.log("farmer (req.user._id):", req.user._id);

      const savedProduce = await newProduce.save();

      user.produce.push(newProduce._id);
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
      const { produceId } = req.params;

      const { error, value } = produceValidator.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        return res.status(400).json({
          status: "failed",
          message: "Validation error",
          errors: error.details.map((detail) => detail.message),
        });
      }

      const updatedProduce = await Produce.findByIdAndUpdate(
        { produceId, farmer: req.user._id },
        { ...value, updatedAt: Date.now() },
        { new: true }
      );

      if (!updatedProduce) {
        return res.status(404).json({
          status: "failed",
          message: "Produce not found or you are not the owner",
        });
      }

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
      const { produceId } = req.params;
      const deletedProduce = await Produce.findByIdAndDelete({
        _id: produceId,
        farmer: req.user._id,
      });

      if (!deletedProduce) {
        return res.status(404).json({
          status: "failed",
          message: "Produce not found or you are not the owner",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Produce listing deleted successfully",
        data: deletedProduce,
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
