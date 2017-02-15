import React, { Component } from 'react';
import { Link } from 'react-router';

class ShowProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      project: {
        tasks: []
      },
      // id: this.props.appState.projects[this.props.params.index].id,
    };
    this.changeTask = this.changeTask.bind(this);
    this.submitTask = this.submitTask.bind(this);
    this.toggleCompletionAndUpdateProgress = this.toggleCompletionAndUpdateProgress.bind(this);
  }
  toggleCompletionAndUpdateProgress(id) {
    console.log("DUDE");
    fetch('/patch/' + id + '/' + this.state.project.id, 
      { method: 'PATCH' }, 
      (response) => {
        console.log(this.state);
        // this.fetchTask2();

        this.setState({ project:response.project });
        console.log(this.state);
    })
  }
  changeTask(event) {
    event.preventDefault();
    // console.log(event.target.value);
    this.setState({newTask: event.target.value});
  }

  submitTask(event) {
    const body = {
      name: event.target.newTask.value,
      projectId: this.state.project.id,
    };
    event.preventDefault();
    event.persist();
    fetch('/add_task', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body),
    }).then((res) => {
      // this.fetchTask();
      return res.json();
    }).then((newTask) => {
      const newProject = Object.assign({}, this.state.project);
      newProject.tasks.push(newTask);
      event.target.newTask.value = '';

      this.setState({
        project: newProject,
      });
      console.log(this.state.project);
    })
  }

  // fetchTask() {
  //   fetch(`/get_tasks/${this.props.params.id}`)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((tasks) => {
  //       this.setState({ tasks });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  fetchTask2() {
    fetch(`/get_project_info/${this.props.params.id}`)
      .then((response) => {
        return response.json();
      })
      .then((project) => {
        this.setState({ project });
        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkTesting() {
    this.setState({checked:!this.state.checked})
  }

  componentWillMount() {
    this.fetchTask2();
  }

  render() {
    const tasks = this.state.project.tasks.map((task) => {console.log(task.completed);
      return (
        <li key={task.id} className="list-group-item">
          <form>
            <input type="checkbox" onClick={this.toggleCompletionAndUpdateProgress} checked={this.state.checked}></input> 
            {task.name}
          </form>
        </li>
      )
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="progress progress-striped active">
              <div className="progress-bar" style={{ width: this.state.project.percentProgress + '%' }}></div>
            </div>
            <h1>{this.state.project.name}</h1>
            <h3>Tasks:</h3>
            <ul className="list-group">
              {tasks}
            </ul>
            <form onSubmit={this.submitTask}>
              <div className="form-group">
                <div className="input-group">
                  <input type="text" name="newTask" className="form-control" placeholder="New Task" />
                  <span className="input-group-btn">

                    <input type="submit" className="btn btn-default" value="Add Task" />
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowProject;
