import { Schema, model, Document } from "mongoose";

interface IStake {
  stakingIndex: number;
  amount: number;
  date: string;
}



export interface IUser extends Document {
  userId: number;
  walletAddress: string;
  referralAddress: string;
  adminAddress: string;
  directIncome: number;
  totalReferrals: number;
  totalstakes: number;
  totalStakedAmount: number;
  stakes: IStake[];
  MaxRoi: number;
  withrawalAmount: number;
  dateRegistered: string;
  
}

const UserSchema = new Schema<IUser>(
  {
    userId: {
      type: Number,
      unique: true,
    },
    walletAddress: String,
    referralAddress: {
      type: String,
      default: null,
    },
    adminAddress: String,

    directIncome: Number,

    totalReferrals: {
      type: Number,
      default: 0,
    },
    totalstakes: {
      type: Number,
      default: 0,
    },
    totalStakedAmount: {
      type: Number,
      default: 0,
    },
    MaxRoi: {
      type: Number,
      default: 2,
    },
    withrawalAmount: {
      type: Number,
      default: 0,
    },
    stakes: [
      {
        stakingIndex: { type: Number, required: true },
        amount: { type: Number, required: true },
        date: { type: String },
      },
    ],
    dateRegistered: String,
  }
  // { timestamps: true }
);

// Pre-save hook to auto-increment userId
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.userId) {
    // Find the highest userId in the collection
    const highestUser = await UserModel.findOne(
      {},
      {},
      { sort: { userId: -1 } }
    );

    // Set the new userId to one more than the highest
    this.userId = highestUser ? highestUser.userId + 1 : 1;
  }

  next();
});

export const UserModel = model<IUser>("User", UserSchema);
