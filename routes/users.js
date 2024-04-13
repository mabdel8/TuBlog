const express = require('express');
const router = express.Router();
const User = require('../models/Users'); // Adjust path as necessary

// POST endpoint to create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", userId: newUser._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from the database
      res.json(users); // Send the users as JSON
    } catch (error) {
      res.status(500).json({ message: error.message }); // Send error message if something goes wrong
    }
  });

module.exports = router;
