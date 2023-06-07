import controller from '../controllers/auth.controller';
import validateSignupRequest from '../middleware/validateSignupRequest';

export default (app) => {
  app.post('/api/auth/signup', validateSignupRequest, controller.signup);
};
