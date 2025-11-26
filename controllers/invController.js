const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build Vehicle detail
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_Id = req.params.inventoryId
  const data = await invModel.getVehicleById(inventory_Id)
  const vehicleArea = await utilities.buildVehicleCard(data[0])
  let nav = await utilities.getNav()
  const invTitle = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`
  res.render("./inventory/vehicleView", {
    title: invTitle,
    nav,
    vehicleArea
  })
}

/* ****************************************
*  Build Management View
* *************************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Management",
    nav,
    errors: null
  })
}


/* ***************************
 *  Build Broken Link
 * ************************** */
invCont.buildBrokenLink = async function (req, res, next) {
  throw error
}

module.exports = invCont



