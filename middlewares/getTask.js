import models from '../db/models';

export const getTask = async (req, res, next) => {
   const {id} = req.params
   let task;

   try {
      task = await models.Task.findOne({ where: { id } })
      if (!task) return res.status(404).json({ message: 'Cannot find task' })
   } catch (err) {
     return res.status(500).json({ message: err.message })
   }
 
   res.task = task
   next()
}