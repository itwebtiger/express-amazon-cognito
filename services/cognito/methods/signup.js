import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

const attributes = (key, value) => ({
  Name: key,
  Value: value,
});

/**
 * Signup user
 *
 * @param {poolData} poolData
 * @param {{ username: string, password: string, givenname: string, familyname: string, }} body
 * @param {*} callback
 */

const signup = (poolData, body, callback) => {
  const userPool = new CognitoUserPool(poolData);

  const { username, password, givenname, familyname } = body;
  const attributesList = [
    attributes('email', username),
    attributes('given_name', givenname),
    attributes('family_name', familyname),
  ];

  const cognitoAttributeList = attributesList.map(
    (element) => new CognitoUserAttribute(element)
  );

  userPool.signUp(
    username,
    password,
    cognitoAttributeList,
    null,
    (err, res) => {
      if (err) {
        callback(err);
        return;
      }

      const data = {
        user_id: res.userSub,
        email: res.username,
        user_confirmed: res.userConfirmed,
      };

      callback(null, data);
    }
  );
};

export default signup;
