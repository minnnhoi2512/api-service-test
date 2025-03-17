const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Create new user
const createUser = async (req, res) => {
    try {
      const { username, password, roleName } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "Username already exists"
        });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = await User.create({
        username,
        roleName,
        password: hashedPassword,
      });
  
      // Remove password from response
      const userResponse = user.toJSON();
      delete userResponse.password;
  
      res.status(201).json({
        success: true,
        data: userResponse,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                error: "Wrong password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username, roleName: user.roleName },
            'toiyeuem',
            { expiresIn: '1h' }
        );

        // Remove password from response
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(200).json({
            success: true,
            data: {
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
module.exports = {
  createUser,
  loginUser,
};
