const express = require("express");
const router = express.Router();
const User = require("./../models/user");
const { jwtAuthMiddleware, generateToken } = require("./../jwt_js");

//Sign up route
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    // Check if an admin already exists
    const adminUser = await User.findOne({ role: "admin" });
    if (data.role === "admin" && adminUser) {
      return res.status(400).json({ error: "Admin user already exists" });
    }

    // Validate Aadhar number
    if (!/^\d{12}$/.test(data.aadharCardNumber)) {
      return res
        .status(400)
        .json({ error: "Aadhar Card Number must be exactly 12 digits" });
    }

    // Check for duplicate Aadhar number
    const existingUser = await User.findOne({
      aadharCardNumber: data.aadharCardNumber,
    });
    if (existingUser) {
      return res
        .status(400)
        .json({
          error: "User with the same Aadhar Card Number already exists",
        });
    }

    const newUser = new User(data);
    const savedUser = await newUser.save();

    const token = generateToken({ id: savedUser._id });

    res.status(200).json({ response: savedUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    if (!aadharCardNumber || !password) {
      return res
        .status(400)
        .json({ error: "Aadhar Card Number and password are required" });
    }

    const user = await User.findOne({ aadharCardNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ error: "Invalid Aadhar Card Number or Password" });
    }

    const token = generateToken({ id: user._id });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Protected profile route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// // Password update route
// router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword) {
//       return res
//         .status(400)
//         .json({ error: "Both currentPassword and newPassword are required" });
//     }

//     const user = await User.findById(userId);

//     if (!user || !(await user.comparePassword(currentPassword))) {
//       return res.status(401).json({ error: "Invalid current password" });
//     }

//     user.password = newPassword;
//     await user.save();

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;
