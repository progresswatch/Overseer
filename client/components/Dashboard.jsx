import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  componentWillMount() {
    fetch('/a', { method: 'GET' })
        .then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            if (!response) browserHistory.push('/login');
        }).catch((err) => {
            throw err;
        })
  }
  componentDidMount() {
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
