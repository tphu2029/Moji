import bcrypt from "bcrypt";
import User from "../models/User.js";

export const signUp = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;
    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({
        message:
          "khong the thieu username, password, email, firstName, lastName",
      });
    }

    // kiem tra username ton tai
    const duplicate = await User.findOne({ username });
    if (duplicate) {
      return res.status(409).json({ message: "username da ton tai" });
    }

    // ma hoa password
    const hashedPassword = await bcrypt.hash(password, 10);

    // tao user moi
    await User.create({
      username,
      hashedPassword,
      email,
      displayName: `${firstName} ${lastName}`,
    });

    // return
    return res.sendStatus(204);
  } catch (error) {
    console.log("loi khi signup", error);
    return res.status(500).json({ message: "loi he thong" });
  }
};
