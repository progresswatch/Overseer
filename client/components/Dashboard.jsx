import React, { Component } from 'react';
import ToDoList from './ToDoList.jsx';
// import { browserHistory } from 'react-router';
import AddProject from './AddProject.jsx'
import Progress from './Progress.jsx'
import Edit from './Edit.jsx'


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.addProject = this.addProject.bind(this);
        this.onClickEditProject = this.onClickEditProject.bind(this);
        this.onClickAddProject = this.onClickAddProject.bind(this);
        // this.data = [{name: 'life',data:[]},{name: 'life2',data:[]}];
        this.state= {
            project: [],
            data: [],
            panel: 'start'
            // panel: 'addProject' // and edit
        }
    }

    onClickAddProject() {  
        this.setState({
            panel: 'addProject'

        })
    }

    onClickEditProject() {
        this.setState({
            panel: 'addProject'
        })
    }

    addProject(value) {
        // let newProject = this.state.project.slice()
        // let newCurrentProject = currentProject.data.slice().concat(value)
        // this.data.push(project)
        let newdata = this.state.data.slice().concat(value)
        this.setState({
            data: newdata// project is an object that get pushde to array
        })

    }

    change(text, newname) {
        let newproject = this.state.project.slice()
        newproject.push({
            name: newname,
            data: this.state.data
        })

        this.setState({
            panel: text,
            project: newproject
        })
    }

    render() {

        let contain = null;
        if (this.state.panel == 'start') {
            contain = this.state.project.map( (p,i) => { return <div><button onClick={this.onClickEditProject}>Edit</button>{'    '}{p.name}{'  '}<Progress percent={i*10 + 50}/></div> })} 
        else if ( this.state.panel == 'addProject' ) {
            contain = <AddProject data={this.state.data} adding={(value) => this.addProject(value)} changeMenu={(text,newname) => this.change(text,newname)}/>
        } else if ( this.state.panel == 'edit' ) {
            contain = <Edit data={this.state.data} adding={(value) => this.addProject(value)} changeMenu={(text,newname) => this.change(text,newname)}/>
        }

        console.log(this.state.panel)
        return (
            <div>
                <h1>Task List</h1>
        
                <button onClick={this.onClickAddProject} >Create Menu</button>
                {/* click on it and generate project */}
                <br></br>

                {contain}

            </div>
        )
    }
}

export default Dashboard;