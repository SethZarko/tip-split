import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt'

// Utility Functions
import { validationResult } from 'express-validator';
import { isValidObjectId } from '../validation/isValidID.js';
import { generateToken } from '../utilities/generateJWT.js';

// ---- ADMIN CRUD CONTROLLERS ---- //

// Admin Create Controller
export const adminCreateController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validation Error Check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await Admin.createAdmin(email, password);

    return res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// Admin Get All Controller
export const adminGetAllController = async (req, res, next) => {
  try {
    const admin = await Admin.findAllAdmin(req);

    return res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};

// Admin Update Controller
export const adminUpdateController = async (req, res, next) => {
  const { email, password } = req.body;
  const { id } = req.params

  try {
    // Validation Error Check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if ID in params
    if (!id) {
      return res.status(400).json({
        data: 'Please Provide and Id',
      });
    }

    // Check if ID is valid MongoID
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        data: 'Invalid Id',
      });
    }

    const updatedUser = await Admin.updateAdmin(req, email, password);

    return res.status(201).json({
      message: 'Admin Updated',
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Admin Delete Controller
export const adminDeleteController = async (req, res, next) => {
  const { id } = req.params
  try {
    // Check if ID in params
    if (!id) {
      return res.status(400).json({
        data: 'Please Provide and Id',
      });
    }

    // Check if ID is valid MongoID
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        data: 'Invalid Id',
      });
    }

    await Admin.deleteAdmin(req);

    return res.status(200).json({ message: 'Admin Deleted' });
  } catch (error) {
    next(error);
  }
};

// ---- ADMIN AUTH CONTROLLERS ---- //

// Admin Login Controller
export const adminLoginController = async (req, res, next) => {
    const {email, password} = req.body

  try {
    // Input Check
    if (!email || !password) {
      throw Error('All Fields Required');
    }

    // Check for User Email
    const user = await Admin.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(403);
      throw Error('Invalid Credentials');
    }
  } catch (error) {
    next(error);
  }
};
