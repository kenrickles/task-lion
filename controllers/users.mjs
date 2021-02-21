import pkg from 'sequelize';
import getHash from '../utilities/hash.mjs';

const { UniqueConstraintError, ValidationError, DatabaseError } = pkg;

export default function users(db) {
  const login = async (req, res) => {
    console.log('login request');

    // set object to store messages for invalid email or password input fields
    const templateData = {};

    try {
      const emailInput = req.body.email;
      const passwordInput = req.body.password;
      const hashedPasswordInput = getHash(passwordInput);

      // try to find a user
      const user = await db.Users.findOne(
        {
          where: { email: emailInput, password: hashedPasswordInput },
        },
      );

      // check if a user is found
      if (user === null) {
        // add message to inform user of invalid email/password
        templateData.invalidMessage = 'Invalid email/password';

        // render the login form
        res.render('login', templateData);
      } else {
        console.log('Login success');

        // generate a hashed userId
        const loggedInHash = getHash(user.id);

        // set cookies with the userId and hashed userId
        res.cookie('userId', user.id);
        res.cookie('loggedInHash', loggedInHash);

        // redirect to home page
        res.redirect('/home');
      }
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const getRegistrationPage = async (req, res) => {
    try {
      // render the registration page
      res.render('register');
    } catch (error) {
      console.log(error);
      // send error to browser
      res.status(500).send(error);
    }
  };

  const register = async (req, res) => {
    console.log('post request to register came in!');

    try {
      const {
        email, password, name, phoneNumber,
      } = req.body;
      const hashedPassword = getHash(password);

      // try to create a user
      const user = await db.Users.create({
        email,
        password: hashedPassword,
        name,
        phoneNumber,
      });

      // generate a hashed userId
      const loggedInHash = getHash(user.id);

      // set cookies with the userId and hashed userId
      res.cookie('userId', user.id);
      res.cookie('loggedInHash', loggedInHash);

      // redirect to home route
      res.redirect('/home');
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        // email is not unique
        console.log('not unique');
        console.log(error);
      } else if (error instanceof ValidationError) {
        console.log(error.errors[0].message);
        res.status(500).send(error);
      } else if (error instanceof DatabaseError) {
        console.log(error);
        res.status(500).send(error);
      }
      else {
        console.log(error);
        res.status(500).send(error);
      }
    }
  };

  return { login, getRegistrationPage, register };
}
