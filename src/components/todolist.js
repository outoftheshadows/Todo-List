import React from 'react';
import Todoform from "./todoform";
import Todo from "./todo";
import todo from './todo';

class Todolist extends React.Component{
    state={
        Todos:[],
        todosToShow:'all',
        toggleAllComplete:true
    }
    addtodo=(todo)=>{
        this.setState({
            Todos:[todo,...this.state.Todos]
        })
    }
    toggleComplete=(id)=>{
       this.setState({
           Todos:this.state.Todos.map(todo=>{
               if(todo.id ===id)
               {
                  return{
                      id:todo.id,
                      text:todo.text,
                      complete:!todo.complete
                  }
               }else
               {
                   return todo;
               }
            })
       })
    }
    updatetodostoshow=(s)=>{
     this.setState({
         todosToShow:s
     })
    }
    handleDeleteTodo=(id)=>{
        this.setState({
            Todos:this.state.Todos.filter(todo=>todo.id!==id)
        })
      
    }
    removeAllTodosThatAreComplete=()=>{
        this.setState({
            Todos:this.state.Todos.filter(todo=> !todo.complete)
        })
      
    }
  render()
  {
      let todos=[];
      if(this.state.todosToShow==='all')
      {
          todos=this.state.Todos;
      }
      else if(this.state.todosToShow==='active')
      {
        todos=this.state.Todos.filter(todo => !todo.complete)
      }
    else if(this.state.todosToShow==='complete')
    {
        todos=this.state.Todos.filter(todo => todo.complete)
    }
    return(
      <div >
        <Todoform onsubmit={this.addtodo}/>
    {todos.map(todo=>(
       <Todo  key={todo.id} toggleComplete={()=>this.toggleComplete(todo.id)} todo={todo} ondelete={()=>this.handleDeleteTodo(todo.id)}/>
    ))}
    <div>
        Left todos: {this.state.Todos.filter(todo => !todo.complete).length}
    </div>
    <div>
    <button onClick={()=>this.updatetodostoshow('all')}>All</button>
    <button onClick={()=>this.updatetodostoshow('active')}>Active</button>
    <button onClick={()=>this.updatetodostoshow('complete')}>Complete</button>
    </div>
    {this.state.Todos.filter(todo=>todo.complete).length ? <div>
        <button onClick={this.removeAllTodosThatAreComplete}>Remove All Todos That Are Complete</button>
    </div>: null}
    <div>
        <button onClick={()=>this.setState({
           Todos:this.state.Todos.map(todo=>({
               ...todo,
               complete:this.state.toggleAllComplete
           })),
           toggleAllComplete:!this.state.toggleAllComplete
        })}>Toggle all as complete : {`${this.state.toggleAllComplete}`}</button>
    </div>
    </div>
    )
  }
}
export default Todolist;
