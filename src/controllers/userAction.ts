import { UserModel } from "../models/user";


export const getUserDetail = async (req: any, res: any) => {
  const { userAddress } = req.body;
  // const userAddress = "0xC43fC9808D09dE41AC2E5Ba9DDc75cf30b048Fb2"

  const registeredUser = await UserModel.findOne({
    walletAddress: userAddress,
  });

  if (registeredUser) {
    try {
      const getUser = await UserModel.find({ walletAddress: userAddress });
      // console.log("getUser", getUser);
      return res.status(200).json({ user: getUser });
    } catch (err) {
      console.log("failed to calculate level income2", err);
    }
  } else {
    return res.status(200).json({ message: "You are not registered" });
  }
};
