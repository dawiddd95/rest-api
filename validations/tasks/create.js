const {check} = require('express-validator');

module.exports = {
   taskCreateSchema: [
      check('title')
         .optional()
         .isLength({max: 255})
         .withMessage('Maximum 255 characters')
         .escape(),
      check('description')
         .optional()
         .isLength({max: 255})
         .withMessage('Maximum 255 characters')
         .escape(),
      check('done', 'Field is required')
         .not().isEmpty()
         .isBoolean()
         .escape(),
   ]
}