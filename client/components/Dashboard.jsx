import React, { Component } from 'react';
import { Link } from 'react-router';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  componentWillMount() {
    fetch('/get_projects')
      .then((response) => {
        return response.json()
      })
      .then((projects) => {
        this.setState({ projects });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const projects = this.state.projects.map((project) => {
      return <Link key={project.id} className="list-group-item" to={`/dashboard/projects/${project.id}`}>{project.name}</Link>;
    });

    return (
      <div className="container">
        <h1>Dashboard</h1>
        <div className="list-group">
          {projects}
        </div>
      </div>
    );
  }
}

export default Dashboard;
