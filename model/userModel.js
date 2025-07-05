const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    username: { type: String, required: [true, 'username is required'], },
    email: { type: String, required: [true, 'email is required'], unique: true },
    password: { type: String, required: [true, 'password is required'], },
    address: { type: Array, },
    phone: { type: String, required: [true, "phone number is required"], },
    userType: { type: String, required: [true, 'userType is required'], default: 'clinet', enum: ["client", 'admin', 'vendor', 'driver'] },
    profile: { type: String, default: " https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ASample_User_Icon.png&psig=AOvVaw3yFJJlKJ27wyYKZ1fopcYh&ust=1748017102337000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwiup-ukvbeNAxVmSGwGHWs1OU0QjRx6BAgAEBk" }
},
    { timestamps: true });




