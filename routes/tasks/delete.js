import express from 'express';
import models from '../../db/models';
import {getTask} from '../../middlewares/getTask';

const router = express.Router();

router.delete('/api/v1.0.0/tasks/:id', getTask, async (req, res) => { 
   const {id} = res.task

   try {
      await models.Task.destroy({ where: { id } })
      res.json({ message: 'Deleted Task' })
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
})

export default router;