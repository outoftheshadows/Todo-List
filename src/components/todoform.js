import React from 'react';
import shortid from 'shortid';


class Todoform extends React.Component{
    state={
        text:''
    }
    handlechange=(event)=>{
       this.setState({
           [event.target.name]:event.target.value
       })
    }
    handlesubmit=(event)=>{
        event.preventDefault();
        this.props.onsubmit({
            id:shortid.generate(),  //a package for generating unique id for key
            text:this.state.text,
            complete:false,

        })
        this.setState({text:""})
    }
  render()
  {
     
    return(
      <div>
          <form onSubmit={this.handlesubmit}>
        <input placeholder="Add your Todo's" name="text" value={this.state.text} onChange={this.handlechange}/>
        <div>
        <button onClick={this.handlesubmit}>Add Todo</button>
        </div>
        </form>
      </div>
    )
  }
}
export default Todoform;
