const utilities = require(".")

  const { body, validationResult } = require("express-validator")
  const validate = {}

  /*  **********************************
    *  Classification Data Validation Rules
    * ********************************* */
    validate.addClassificationRules = () => {
      return [
        // valid email is required and cannot already exist in the database
        body("classification_name")
            .trim()
            .escape()
            .isAlphanumeric()//Only allows A-Za-z0-9, doesn't allow special characters and spaces
            .withMessage("Please type a valid classification name")
            .notEmpty()
            .withMessage("Please type classification name") // on error this message is sent.
      ]
    }

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkAddClassificationData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      errors,
      title: "Add Classification",
      nav,
      classification_name
    })
    return
  }
  next()
}

  /*  **********************************
    *  Classification Data Validation Rules
    * ********************************* */
    validate.addInventoryRules = () => {
      return [
        body("inv_make")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please type the make"), // on error this message is sent.

            body("inv_model")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please type the model"), // on error this message is sent.

            body("inv_year")
            .trim()
            .escape()
            .notEmpty()
            .isNumeric()
            .withMessage("The input should be numeric")
            .isInt({ min: 1980, max: 2026 })
            .withMessage("Please type a year between 1980 and 2026"), // on error this message is sent.

            body("inv_description")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please type the description"), // on error this message is sent.

            body("inv_image")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please type the image path"), // on error this message is sent.

            body("inv_thumbnail")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please type the thumbnail path"), // on error this message is sent.

            body("inv_price")
            .trim()
            .escape()
            .notEmpty()
            .isNumeric()
            .withMessage("The price should be numeric"), // on error this message is sent.

            body("inv_miles")
            .trim()
            .escape()
            .notEmpty()
            .isNumeric()
            .withMessage("The miles should be numeric"), // on error this message is sent.

            body("inv_color")
            .trim()
            .escape()
            .notEmpty()
            .isAlpha()
            .withMessage("Please type the color"), // on error this message is sent.

            body("classification_id")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please select the classification") // on error this message is sent.
      ]
    }

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkAddInventoryData = async (req, res, next) => {
  const { inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(classification_id) 
    res.render("inventory/add-inventory", {
      errors,
      title: "Add Inventory",
      nav,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classificationList
    })
    return
  }
  next()
}

/* ******************************
 * Check data and return errors to editing view
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const { inv_id,
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
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classificationList = await utilities.buildClassificationList(classification_id) 
    res.render("inventory/edit-inventory", {
      errors,
      title: "Edit" + inv_make + " " + inv_model,
      nav,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classificationList
    })
    return
  }
  next()
}

/*  **********************************
    *  Classification Data Validation Rules
    * ********************************* */
    validate.newInventoryRules = () => {
      return [
        body("inv_make")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please type the make"), // on error this message is sent.

            body("inv_model")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please type the model"), // on error this message is sent.

            body("inv_year")
            .trim()
            .escape()
            .notEmpty()
            .isNumeric()
            .withMessage("The input should be numeric")
            .isInt({ min: 1980, max: 2026 })
            .withMessage("Please type a year between 1980 and 2026"), // on error this message is sent.

            body("inv_description")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please type the description"), // on error this message is sent.

            body("inv_image")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please type the image path"), // on error this message is sent.

            body("inv_thumbnail")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please type the thumbnail path"), // on error this message is sent.

            body("inv_price")
            .trim()
            .escape()
            .notEmpty()
            .isNumeric()
            .withMessage("The price should be numeric"), // on error this message is sent.

            body("inv_miles")
            .trim()
            .escape()
            .notEmpty()
            .isNumeric()
            .withMessage("The miles should be numeric"), // on error this message is sent.

            body("inv_color")
            .trim()
            .escape()
            .notEmpty()
            .isAlpha()
            .withMessage("Please type the color"), // on error this message is sent.

            body("classification_id")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Please select the classification") // on error this message is sent.
      ]
    }

module.exports = validate