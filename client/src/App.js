import React from 'react';
import axios from 'axios'
import './App.css';


const useFetch = () => {
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
     const fetchData = async () => {
        const result = await axios.get('/api/v1.0.0/tasks');
        setTasks(result.data)
     }
     fetchData()
  }, [])

  return [tasks]
}


function App() {
  const [tasks] = useFetch();

  console.log(tasks)

  return (
    <div>
      All tasks
      {tasks.map(task => 
        <div style={{'border': '2px solid red'}}>
          <p>id: {task.id}</p>
          <strong>title: {task.title}</strong>
          <p>description: {task.description}</p>  
        </div>  
      )}
    </div>
  );
}

export default App;
