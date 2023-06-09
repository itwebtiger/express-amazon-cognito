import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

/**
 * Signin
 * @param {*} poolData
 * @param {{username, password}} body
 * @param {*} callback
 */

const signin = (poolData, body, callback) => {
  const userPool = new CognitoUserPool(poolData);

  const { username, password } = body;

  const authenticationData = {
    Username: username,
    Password: password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (res) => {
      const data = {
        refreshToken: res.getRefreshToken().getToken(),
        accessToken: res.getAccessToken().getJwtToken(),
        accessTokenExpiresAt: res.getAccessToken().getExpiration(),
        idToken: res.getIdToken().getJwtToken(),
        idTokenExpiresAt: res.getAccessToken().getExpiration(),
      };
      callback(null, data);
    },
    onFailure: (err) => {
      callback(err);
    },
    mfaRequired: () => {
      const data = {
        nextStep: 'MFA_AUTH',
        loginSession: cognitoUser.Session,
      };
      callback(null, data);
    },
    totpRequired: () => {
      const data = {
        nextStep: 'SOFTWARE_TOKEN_MFA',
        loginSession: cognitoUser.Session,
      };
      callback(null, data);
    },
    newPasswordRequired: () => {
      const data = {
        nextStep: 'NEW_PASSWORD_REQUIRED',
        loginSession: cognitoUser.Session,
      };
      callback(null, data);
    },
  });
};

export default signin;
