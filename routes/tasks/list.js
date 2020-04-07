import express from 'express';
import models from '../../db/models';

const router = express.Router();

// e. g. localhost:5000/api/v1.0.0/tasks || localhost:5000/api/v1.0.0/tasks?offset=10&limit=40&orderBy=desc&sortBy=description
router.get('/api/v1.0.0/tasks', async (req, res) => { 
   const {offset, limit, sortBy = 'id', orderBy = 'asc'} = req.query;

   try {
      const tasks = await models.Task.findAll({
         offset,
         limit,
         order: [
            [sortBy, orderBy]
         ],
      })

      res.json(tasks)
   } catch(err) {
      res.status(500).json({message: err.message})
   }
})

export default router;