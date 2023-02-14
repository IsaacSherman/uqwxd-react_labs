import React from "react";
import "./App.css";
const App = () => 
{
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  // Add the handlesubmit code here
    function handleSubmit(e) {
        e.preventDefault();
        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed : false
        };
        if(newTodo.text.length > 0){
            setTodos([...todos].concat(newTodo));
            setTodo("");
        }
        else{
            alert("Enter valid todo");
            setTodo("");
        }
    }
    
    
    // Add the deleteToDo code here
    function deleteToDo(id){
        let del = [...todos].filter(x=>x.id !== id);
        setTodos(del);
    }
    
    // Add the toggleComplete code here
    function toggleComplete(id){
        let updatedTodos = [...todos].map(x=>{
            if(x.id === id){
                x.completed = !x.completed;
            }
            return x;
        });
        setTodos(updatedTodos);
    }
    
    // Add the submitEdits code here
    function submitEdits(id){
        let updatedTodos = [...todos].map(x=>{
            if(x.id === id){
                setTodoEditing(x);
                x.text=editingText;
            }
            return x;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);

    }

    return (
        <div id="todo-list">
          <h1>Todo List</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
            <button type="submit">Add Todo</button>
          </form>
          {todos.map((todo) => (
            <div key={todo.id} className="todo">
              <div className="todo-text">
                
{todo.id === todoEditing?
                    (
                    <div className="todo-actions">
                        <input type="checkbox" id="completed" checked={todo.completed}
                                        onChange={()=>toggleComplete(todo.id)}></input>
                        <input type="text" onChange={(e)=>setEditingText(e.target.value)}></input>/input>{todo.text}
                        <button onClick={()=>setTodoEditing(todo.id)}>Done</button>
                        </div>
                    )
                    :
                    (
                    <div className="todo-actions">

                        <input type="checkbox" id="completed" checked={todo.completed}
                                        onChange={()=>toggleComplete(todo.id)}></input>
                    

                <button name="Edit" onClick={()=>setTodoEditing(todo.id)}>Edit</button>
                </div>
                        )
                    }
              </div>
              <div className="todo-actions">
                {todo.id === todoEditing ? (
                  <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                ) : (
                  <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                )}
    
                <button onClick={() => deleteToDo(todo.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      );
    };
export default App;