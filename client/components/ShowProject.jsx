import React, { Component } from 'react';
import { Link } from 'react-router';

class ShowProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: '',
    };
    this.changeTask = this.changeTask.bind(this);
    this.submitTask = this.submitTask.bind(this);

  }
  toggleTaskAndUpdateProgress() {
    
  }
  changeTask(event) {
    event.preventDefault();
    console.log(event.target.value);
    this.setState({newTask: event.target.value});
  }

  submitTask(event) {
    const body = {
      name: this.state.newTask,
      projectId: this.props.params.id,
    };
    event.preventDefault();
    fetch('/add_task', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body),
    }).then((res) => {
      this.fetchTask();
    })
  }

  fetchTask() {
    fetch(`/get_tasks/${this.props.params.id}`)
      .then((response) => {
        return response.json();
      })
      .then((tasks) => {
        this.setState({ tasks });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillMount() {
    this.fetchTask();
  }

  render() {
    const tasks = this.state.tasks.map((task) => {
      return <Link className="list-group-item" to="#">{task.name}</Link>
    });

    return (
      <div className="container">
        <h1>List of tasks for some project</h1>
        <div className="list-group">
          {tasks}
        </div>
        <form onSubmit={this.submitTask}>
          <label>
          Task name:
          <input type='text' name='newTask' onChange={this.changeTask} />
          </label>
          <input type='submit' value='Add Task'/>
        </form>
      </div>
    );
  }
}

export default ShowProject;
