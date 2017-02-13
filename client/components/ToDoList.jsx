import React, { Component } from 'react'

class ToDoList extends Component {
    constructor(props){
        super(props);
        this.onclick = this.onclick.bind(this);
    }
    
    onclick(event){
        console.log('submit running')
        event.preventDefault();
        let inputValue = event.target.elements.itemName.value;
        this.props.addTask( inputValue );
        event.target.elements.itemName.value = "";
    }

    render() {
        console.log(this.props.tasks)
        const items = this.props.tasks.map((item, idx) => {
            return <li>{item}</li>;
        })

        return(
            <div>
                <ul>{items}</ul>
                <form onSubmit={this.onclick}>
                    <input name="itemName" type="text" />
                    <button type='Submit'>Add Task</button> 
                </form>
            </div>
        );
    }

}

export default ToDoList 
