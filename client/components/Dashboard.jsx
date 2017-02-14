import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   projects: [],
    // };
  }

  // componentWillMount() {
  //   fetch('/a', { method: 'GET' })
  //       .then((response) => {
  //           return response.json();
  //       }).then((response) => {
  //           console.log(response);
  //           if (!response) browserHistory.push('/login');
  //       }).catch((err) => {
  //           throw err;
  //       })
  // }
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    const projects = this.props.appState.projects.map((project) => {
      return <Link key={project.id} className="list-group-item" to={`/dashboard/projects/${project.id}`}>{project.name}</Link>;
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <h1>Dashboard</h1>
            <div className="list-group">
              {projects}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
