import React, { Component } from 'react';
import { Link } from 'react-router';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
    this.submitProject = this.submitProject.bind(this);
  }

  submitProject(event) {
    const body = {
      name: event.target.newProject.value,
    };
    event.preventDefault();
    event.persist();
    fetch('/add_project', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body),
    }).then(res => res.json()).then(newProject => {
      console.log(newProject);
      const newProjects = this.state.projects.concat(newProject);
      event.target.newProject.value = '';
      this.setState({
        projects: newProjects
      });
    })
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
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <h1>Dashboard HOT RELOAD!!</h1>
            <div className="list-group">
              {projects}
            </div>
            <form onSubmit={this.submitProject}>
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
