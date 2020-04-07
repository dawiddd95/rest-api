import express from 'express';
import Sequelize from 'sequelize';
import models from '../../db/models';

const router = express.Router();

const Op = Sequelize.Op;

// search notes with searching phrase in title or description
// e. g. localhost:5000/api/v1.0.0/tasks/search?q=sea&orderBy=asc&sortBy=id
router.get('/api/v1.0.0/tasks/search', async (req, res) => { 
   const {q, offset, limit, sortBy = 'id', orderBy = 'asc'} = req.query;

   try {
      const tasks = await models.Task.findAll({
         where: {
            [Op.or]: [
               { title: { [Op.iLike]: `%${q}%` } }, 
               { description: { [Op.iLike]: `%${q}%` } }, 
            ]
         },
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