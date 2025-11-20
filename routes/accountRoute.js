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
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

//Route to get the error 500//
router.get("/broken", utilities.handleErrors(accountController.buildBrokenLink));

module.exports = router;