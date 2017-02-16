// const mocha = require('mocha');
const { mount, shallow } = require('enzyme');

const request = require('supertest');
const expect = require('expect');
const React = require('react');
const sinon = require('sinon');
// const ShowProject = require('../client/src/components/ShowProject.jsx');
// const Dashboard = require('../client/src/components/Dashboard.jsx');
import Dashboard from '../client/src/components/Dashboard.jsx';
import ShowProject from '../client/src/components/ShowProject';

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;


describe('Front-end', () => {
  let wrapper;
  describe('Dashboard', (done) => {
    it('Should call componentDidMount', () => {
      sinon.spy(Dashboard.prototype, 'componentDidMount');
      wrapper = mount(<Dashboard appState={{ projects: [] }} fetchProjects={()=>{}}/>);
      expect(Dashboard.prototype.componentDidMount.calledOnce).toEqual(true);
    });
    it('Should call fetchProjects', () => {
      const fakeFetchProjects = sinon.spy();
      wrapper = mount(<Dashboard appState={{ projects: [{}] }} fetchProjects={fakeFetchProjects}/>);
      expect(fakeFetchProjects.calledOnce).toEqual(true);
    })
    it('Should render all projects', () => {
      wrapper = mount(<Dashboard appState={{ projects: [{id:1, percentProgress:20}, {id:2, percentProgress:10}] }} fetchProjects={()=>{}}/>);
      expect(wrapper.find('Link').length).toEqual(2);
    })
    it('Should be able to make get requests to DB', () => {
      request(HOST)
          .get('/get_projects')
          .expect(200, done);
    });
  });
  describe('ShowProject', () => {
    xit('Should render all tasks', () => {
      wrapper = mount(<ShowProject />);

    });
    xit('Should fire toggle function onclick of checkbox', () => {
      sinon.spy(ShowProject.prototype, 'toggleCompletionAndUpdateProgress');
      wrapper = shallow(<ShowProject />);
      wrapper.setState({ project: {tasks: [{ id: 1, completed: true }, { id: 2, completed: false }]}});

    })
  });
});