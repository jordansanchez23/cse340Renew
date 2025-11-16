// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//Route to build individual view for each vehicle//
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

//Route to get the error 500//
router.get("/broken", utilities.handleErrors(invController.buildBrokenLink));

module.exports = router;