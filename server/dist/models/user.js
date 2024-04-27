import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Please enter Id"],
    },
    name: {
        type: String,
        required: [true, "Please enter name"],
    },
    email: {
        type: String,
        required: [true, "Please enter Email"],
        unique: [true, "Email already Exists"],
        validate: validator.default.isEmail,
    },
    photo: {
        type: String,
        required: [true, "Please enter Photo"],
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please enter your gender"],
    },
    dob: {
        type: Date,
        required: [true, "Please enter your date of birth"],
    },
}, { timestamps: true });
userSchema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
});
const User = mongoose.model("User", userSchema);
export default User;
