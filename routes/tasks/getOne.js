import express from 'express';
import {getTask} from '../../middlewares/getTask';

const router = express.Router();

router.get('/api/v1.0.0/tasks/:id', getTask, async (req, res) => { 
   res.json(res.task)
})

export default router;