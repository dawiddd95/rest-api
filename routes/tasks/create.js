import express from 'express';
import {validationResult} from 'express-validator';
import models from '../../db/models';
import {taskCreateSchema} from '../../validations/tasks/create';

const router = express.Router();

// dla email który już jest zajęty użyjemy status 400 Bad Request
// dla unauthorized najlepiej użyć 401
router.post('/api/v1.0.0/tasks', taskCreateSchema, async (req, res) => { 
   const {title, description, done} = req.body;

   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.status(422).json({success: false, message: errors.mapped()});

   try {
      const task = await models.Task.create({title, description, done})
      res.status(201).json(task)
   } catch(err) {
      // Domyślnie było 400, ale wprzypadku walidacji z express-validator zmieniam na 500
      res.status(500).json({message: err.message})
   }
})

export default router;