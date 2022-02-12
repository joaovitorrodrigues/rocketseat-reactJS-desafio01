import { useState, useEffect } from 'react'
import '../styles/tasklist.scss'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'


interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

      if(newTaskTitle !== ''){
        setTasks(tasks => [...tasks,{id: createNewId(), title: newTaskTitle, isComplete:false}]);
        setNewTaskTitle("");
      }
  }

  function createNewId(){
    const min = 1;
    const max = 100;
    let index = 0;
    let rand = 0;
    do {
     rand = min + Math.random() * (max - min);
    index = tasks.findIndex(id => id.id == rand)
    } while(index > 0)
    return rand;
  }

  function handleToggleTaskCompletion(id: number) {
    let index = tasks.findIndex(task => task.id == id);
    tasks[index].isComplete = tasks[index].isComplete == true ? false : true;
    setTasks(tasks => [...tasks]);
    
  }

  function handleRemoveTask(id: number) {
    let index = tasks.findIndex(task => task.id == id);
    tasks.splice(index,1);
    setTasks(tasks => [...tasks])
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}