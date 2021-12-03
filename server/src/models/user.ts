import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true, min: 5 },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
