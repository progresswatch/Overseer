import React, { Component } from 'react';
import ToDoList from './ToDoList.jsx';
class AddProject extends Component {
    constructor(props) {
        super(props);
        this.whenClick = this.whenClick.bind(this)
        this.projectData = []; // insdie projectData should be array of task, each task will e an object
    }
    // grabData(value) {
    //     this.projectData = this.props.task.push(value);
    // }

    whenClick(event) {
        event.preventDefault();
        const title = event.target.elements.itemName.value;
        this.props.changeMenu('start',title)
    }

    render() {
        return (
            <div>
                this is the create page.
                <ToDoList addTask={(value) => {this.props.adding(value)
                    }} tasks={this.props.data} />
                {/*when you lick on the add project, it return the array and go back to the previous page*/}
                <form onSubmit={this.whenClick}>
                    <label>
                        Project Name:
                        <input name="itemName" type="text" />
                    </label>
                
                    <button type='Submit'>Create New Project</button>
                </form>
            </div>
        )
    }
}

export default AddProject;