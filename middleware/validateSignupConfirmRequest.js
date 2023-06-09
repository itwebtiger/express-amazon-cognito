import { body, validationResult } from 'express-validator';

const validateSignupConfirmRequest = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('code')
    .notEmpty()
    .withMessage('Code is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('Password must be at least 6 characters long'),

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

export default validateSignupConfirmRequest;
