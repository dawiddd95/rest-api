import express from 'express';
import {validationResult} from 'express-validator';
import models from '../../db/models';
import {taskUpdateSchema} from '../../validations/tasks/update';
import {getTask} from '../../middlewares/getTask';

const router = express.Router();

router.patch('/api/v1.0.0/tasks/:id', taskUpdateSchema, getTask, async (req, res) => { 
   const {id} = res.task;
   const {title, description, done} = req.body;

   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.status(422).jsonp(errors.array());

   try {
      const updatedTask = await models.Task.update({title, description, done}, {where: {id} })
      res.json(updatedTask)
   } catch (err) {
      res.status(400).json({ message: err.message })
   }
})

export default router;