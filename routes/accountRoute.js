// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/index")

// Route to build account by My account view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

//Route to get the error 500//
router.get("/broken", utilities.handleErrors(accountController.buildBrokenLink));

module.exports = router;