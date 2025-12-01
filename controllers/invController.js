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
  const classificationList = await utilities.buildClassificationList()
  res.render("./inventory/management", {
    title: "Management",
    nav,
    errors: null,
    classificationList
  })
}

/* ****************************************
*  Build Add classifcation View
* *************************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null
  })
}

/* ***************************
 *  Process to add classification (Post)
 * ************************** */
invCont.processAddClassification = async function(req, res) {
  const { classification_name } = req.body

  const processResult = await invModel.processAddClassification(
        classification_name
    )

  let nav = await utilities.getNav()

  if (processResult) {
    req.flash(
      "notice",
      `${classification_name} saved as a new Classification.`
    )
    res.status(201).render("inventory/management", {
      title: "Management",
      nav,
      errors: null
    })
  } else {
    req.flash("message warning", "Sorry, the process to add a new classification failed.")
    res.status(501).render("inventory/add-classification", {
      title: "Add classification",
      nav,
      classification_name
    })
  }
}

/* ****************************************
*  Build Add inventory View
* *************************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationList,
    errors: null
  })
}

/* ***************************
 *  Process to add Inventory (Post)
 * ************************** */
invCont.processAddInventory = async function(req, res) {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id } = req.body

  const processResult = await invModel.processAddInventory(
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color,
        classification_id
    )

  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList(classification_id)

  if (processResult) {
    req.flash(
      "notice",
      `${inv_make} ${inv_model} ${inv_year} saved as a new Vehicle.`
    )
    res.status(201).render("inventory/management", {
      title: "Management",
      nav,
      errors: null
    })
  } else {
    req.flash("message warning", "Sorry, the process to add a new Inventory failed.")
    res.status(501).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    })
  }
}

/* ***************************
 *  Build Broken Link
 * ************************** */
invCont.buildBrokenLink = async function (req, res, next) {
  throw error
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.buildEditView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

module.exports = invCont



