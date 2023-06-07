import { body, validationResult } from 'express-validator';

const validateSignupRequest = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('givenname').notEmpty().withMessage('Givenname is required'),
  body('familyname').notEmpty().withMessage('Familyname is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array(),
      });
    }
    return next(); // Added return statement here
  },
];

export default validateSignupRequest;
