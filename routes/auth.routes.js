import controller from '../controllers/auth.controller';
import {
  validateSignupRequest,
  validateSignupConfirmRequest,
} from '../middleware';

export default (app) => {
  app.post('/api/auth/signup', validateSignupRequest, controller.signup);
  app.post(
    '/api/auth/email/verify',
    validateSignupConfirmRequest,
    controller.signupConfirm
  );
};
