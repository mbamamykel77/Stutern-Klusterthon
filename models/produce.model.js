import { Schema, model } from 'mongoose';

const produceSchema = new Schema({
  produceName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  farmer: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: false,
  },
},
{
  timestamps: true,
},
);

export default model('Produce', produceSchema);
