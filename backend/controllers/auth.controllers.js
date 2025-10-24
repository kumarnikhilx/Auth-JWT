import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/token.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const signup = async (req, res) => {
  try {
    let { firstName, lastName, email, password, userName } = req.body;
    if (!firstName || !lastName || !email || !password || !userName) {
      return res.status(400).json({ message: "Fill All the Details" });
    }
   let profileImage = ""; // declare once at top

    if (req.file) {
      const localPath = req.file.path; // temporary file path
      try {
        const url = await uploadOnCloudinary(localPath); // get URL
        profileImage = url; // assign returned URL
        console.log("Uploaded to Cloudinary:", url);
      } catch (err) {
        console.log("Cloudinary Upload Error:", err);
      }
    }

    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    //User Creation

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      userName,
      profileImage,
    });

    let token = generateToken(User._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User Created!",
      user: {
        firstName,
        lastName,
        email,
        userName,
        profileImage
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const userExcited = await User.findOne({ email });
    if (!userExcited) {
      return res.status(400).json({ message: "user doesn't exist!" });
    }
    const match = await bcrypt.compare(password, userExcited.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    let token;
      try{

      token=generateToken(userExcited._id);
        
      } catch (error) {
        console.log(error);
      }
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      user: {
        firstName: userExcited.firstName,
        lastName: userExcited.lastName,
        email: userExcited.email,
        userName: userExcited.userName,
      },
    });
  } catch (error) {
    res.status(400).json({message:error.message})
  }
};


export const logout= async(req,res)=>{
  try {
    res.clearCookie("token");
    return res.status(200).json({message:"logout Successfully!"})

  } catch (error) {
    return res.status(400).json(error);
  }
}