const {default: mongoose} = require("mongoose");

const otpSchema = new mongoose.Schema({
    code: {type: String, required: false, default: undefined},
    expireIn: {type: Number, required: false, default: 0},
})

const userSchema = new mongoose.Schema({
    fullname: {type: String, required: false},
    mobile: {type: String, unique: true, required: true},
    otp: {type: otpSchema},
    verifiedMobile: {type: Boolean, default: false, required: true},
    accessToken: {type: String}
}, {timestamps: true})

const userModel = mongoose.model("user", userSchema)
module.exports = {userModel}