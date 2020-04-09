import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express'

import tasksListRoute from './routes/tasks/list';
import tasksSearchRoute from './routes/tasks/search';
import getOneTaskRoute from './routes/tasks/getOne';
import createTaskRoute from './routes/tasks/create';
import deleteTaskRoute from './routes/tasks/delete';
import updateTaskRoute from './routes/tasks/update';


dotenv.config();   

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(tasksListRoute);
app.use(tasksSearchRoute);
app.use(getOneTaskRoute);
app.use(createTaskRoute);
app.use(deleteTaskRoute);
app.use(updateTaskRoute);


app.listen(5000, () => console.log('Server Started'))

export default app;