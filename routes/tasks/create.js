import express from 'express';
import {validationResult} from 'express-validator';
import models from '../../db/models';
import {taskCreateSchema} from '../../validations/tasks/create';

const router = express.Router();

router.post('/api/v1.0.0/tasks', taskCreateSchema, async (req, res) => { 
   const {title, description, done} = req.body;

   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.status(422).jsonp(errors.array());

   try {
      const task = await models.Task.create({title, description, done})
      res.status(201).json(task)
   } catch(err) {
      res.status(400).json({message: err.message})
   }
})

export default router;