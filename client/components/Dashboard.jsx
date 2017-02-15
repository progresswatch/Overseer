import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    const projects = this.props.appState.projects.map((project, i) => {
      return <Link key={project.id} className="list-group-item" to={`/dashboard/projects/${i}`}>{project.name}</Link>;
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <h1>Dashboard HOT RELOAD!!</h1>
            <div className="list-group">
              {projects}
            </div>
            <form onSubmit={this.props.submitProject}>
              <div className="form-group">
                <div className="input-group">
                  <input type="text" name="newProject" className="form-control" placeholder="New Project" />
                  <span className="input-group-btn">
                    <input type="submit" className="btn btn-default" value="Add Project" />
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

export default Dashboard;
