import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import App from './App.jsx';
import Navbar from './Navbar.jsx';

class Root extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoggedIn: false,
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      userInformation: '',
      isLoggedIn: false,
      projects: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.fetchProjects = this.fetchProjects.bind(this);
    this.submitProject = this.submitProject.bind(this);
  }
  fetchProjects() {
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
  handleLogin(e) {
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    fetch('/', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        alert('Please enter valid fields.');
        browserHistory.push('/');
      }
    }).then((data) => {
      // console.log(data);
      this.setState({
        user: data.userName,
        isLoggedIn: true
      });
      browserHistory.push('/dashboard');
    }).catch((res) => {
      alert('Please enter valid fields.');
      browserHistory.push('/');
    })
    e.preventDefault();
  }

  handleSubmit(e) {
    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const email = e.target.elements.email.value;
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    this.setState({ firstName, lastName, email, username, password }, () => {
      fetch('/signup', {
        method: 'post',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((res) => {
        if (res.status === 200) {
          browserHistory.push('/dashboard');
        } else {
          alert('Please enter valid fields.');
          browserHistory.push('/signup');
        }
      }).catch((res) => {
        alert('Please enter valid fields.');
        browserHistory.push('/signup');
      })
    });
    e.preventDefault();
  }

  render() {
    const theProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        handleSubmit: this.handleSubmit,
        handleLogin: this.handleLogin,
        fetchProjects: this.fetchProjects,
        submitProject: this.submitProject,
        appState: this.state
      });
    });

    return (
      <div>
        <Navbar />
        {theProps}
      </div>
    )
  }
}

export default Root;
