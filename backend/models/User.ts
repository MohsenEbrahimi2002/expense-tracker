import mongoose, { Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserType {
  id: mongoose.Types.ObjectId
  fullName: string;
  email: string;
  password: string;
  profileImageUrl?: string | null;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}


const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

//Hash password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

//compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return await bcrypt.compare(candidatePassword, this.password);
};
type UserDocument = mongoose.Document & UserType;
const User = mongoose.model<UserDocument>("user", UserSchema);
export default User;
