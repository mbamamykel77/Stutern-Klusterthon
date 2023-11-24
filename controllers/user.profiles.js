import User from "../models/user.models.js";

export const getUserProfiles = async (req, res) => {
  try {
    const users = await User.find({}, "firstName lastName");

    res.status(200).json({
      status: "success",
      data: users,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export default getUserProfiles