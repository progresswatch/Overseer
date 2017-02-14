import React from 'react';

const Login = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <div className="well">
          <div className="page-header">
            <h1>Login</h1>
          </div>
          <form onSubmit={props.handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" className="form-control" name="username" placeholder="Username" autoFocus />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="form-control" name="password" placeholder="Password" />
            </div>

            <button className="btn btn-block btn-primary" type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
