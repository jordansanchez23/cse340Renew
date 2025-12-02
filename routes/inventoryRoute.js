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

//Route to build Management//
router.get("/", utilities.handleErrors(invController.buildManagement));

//Route to build Add Classification view//
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to post the classification 
router.post(
  "/add-classification",
  inventoryValidate.addClassificationRules(),
  inventoryValidate.checkAddClassificationData,
  utilities.handleErrors(invController.processAddClassification)
)

//Route to build Add Inventory view//
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

// Route to post the add Inventory
router.post(
  "/add-inventory",
  inventoryValidate.addInventoryRules(),
  inventoryValidate.checkAddInventoryData,
  utilities.handleErrors(invController.processAddInventory)
)

//Route to build the classification List//
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

//Route to build the edit view of the item
router.get("/edit/:inventoryId", utilities.handleErrors(invController.buildEditView));

// Route to update the item Inventory
router.post(
  "/update/",
  inventoryValidate.newInventoryRules(),
  inventoryValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

//Route to build the delete view of the item
router.get("/delete/:inventoryId", utilities.handleErrors(invController.buildDeleteItemView));

// Route to delete the item Inventory
router.post(
  "/delete/",
  inventoryValidate.newInventoryRules(),
  inventoryValidate.checkDeleteData,
  utilities.handleErrors(invController.deleteInventory)
)

//Route to get the error 500//
router.get("/broken", utilities.handleErrors(invController.buildBrokenLink));

module.exports = router;