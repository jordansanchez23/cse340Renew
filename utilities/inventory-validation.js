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
    *  Add Vehicle Validation Rules
    * ********************************* */
    validate.addInventoryRules = () => {
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
validate.checkInventoryData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-inventory", {
      errors,
      title: "Add Classification",
      nav,
      classification_name
    })
    return
  }
  next()
}

module.exports = validate