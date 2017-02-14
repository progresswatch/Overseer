import React, { Component } from 'react';

class ShowProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentWillMount() {
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

  render() {
    const tasks = this.state.tasks.map((task) => {
      return <p key={task.id}>{task.name}</p>;
      return <Link className="list-group-item" to="#">{task.name}</Link>
    });

    return (
      <div className="container">
        <h1>List of tasks for some project</h1>
        <div className="list-group">
          {tasks}
        </div>
      </div>
    );
  }
}

export default ShowProject;
