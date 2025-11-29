// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/index")
const regValidate = require('../utilities/account-validation')

// Route to build account by My account view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to build Register view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Route to post the new register account
// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  /*utilities.handleErrors(*/accountController.registerAccount/*)*/
)

// Route to post the login account
// Process the Login data
// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  (req, res) => {
    utilities.handleErrors(accountController.accountLogin)
  }
)

//Route to get the error 500//
router.get("/broken", utilities.handleErrors(accountController.buildBrokenLink));


module.exports = router;