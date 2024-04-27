import { TryCatch } from "../middlewares/error.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
// export const newUser = async (
//   req: Request<{}, {}, NewUserRequestBody>, // newUserRequestBody is not compulsory
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { name, email, photo, gender, _id, dob } = req.body;
//     const user = await User.create({
//       name,
//       email,
//       photo,
//       gender,
//       _id,
//       dob: new Date(dob)
//     });
//     return res.status(201).json({
//       success: true,
//       message: `Welcome, ${user.name}`,
//       user
//     });
//   } catch (err) {
//      return next(err);
//   }
// };
export const newUser = TryCatch(async (req, // newUserRequestBody is not compulsory
res, next) => {
    const { name, email, photo, gender, _id, dob } = req.body;
    let user = await User.findById(_id);
    if (user) {
        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`,
        });
    }
    if (!_id || !name || !email || !photo || !gender || !dob) {
        return next(new ErrorHandler("Please add all fields", 400));
    }
    user = await User.create({
        name,
        email,
        photo,
        gender,
        _id,
        dob: new Date(dob),
    });
    return res.status(201).json({
        success: true,
        message: `Welcome, ${user.name}`,
        user,
    });
});
export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({}).lean().exec();
    return res.status(200).json({
        success: true,
        users,
    });
});
export const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("Invalid Id", 400));
    }
    return res.status(200).json({
        success: true,
        message: `${user.name} data is fetched`,
        user,
    });
});
export const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("Invalid Id", 400));
    }
    await user.deleteOne();
    return res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
});
