// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")
const inventoryValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//Route to build individual view for each vehicle//
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

//Route to build individual view for each vehicle//
router.get("/", utilities.handleErrors(invController.buildManagement));

//Route to build Add Classification view//
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to post the login account
// Process the Login data
// Process the login attempt
router.post(
  "/add-classification",
  inventoryValidate.addClassificationRules(),
  inventoryValidate.checkAddClassificationData,
  utilities.handleErrors(invController.processAddClassification)
)

//Route to get the error 500//
router.get("/broken", utilities.handleErrors(invController.buildBrokenLink));

module.exports = router;