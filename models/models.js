// models here
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [false, "please tell us your email address"],
      unique: true,
      lowercase: true,
      validator: {
        match: [
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          "Please add a valid email string to the email path.",
        ],
      },
    },
    password: {
      type: String,
      required: [false, "please provide a password"],
      minlength: 6,
    },
    produce: [
      {
        type: String,
        ref: "Produce",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);


