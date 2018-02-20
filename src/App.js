import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ChunkListContainer from "./js/pages/chunks/ChunkListContainer";
import ProjectsListContainer from "./js/pages/projects/ProjectsListContainer";
import ChaptersContainer from "./js/pages/chapters/ChaptersContainer";
import "./App.css";
import NotFound from "./js/pages/NotFound";
import Header from "./js/components/header";
import Home from "./js/pages/home/home";
import About from "./js/pages/about/about";
import axios from "axios";
import User from "./js/pages/user/user";
import { DragDropContext } from "react-dnd";
import Notifications from 'react-notify-toast';
import { default as TouchBackend } from 'react-dnd-touch-backend';

// import and configure the raven client for sentry in order to track errors
import Raven from 'raven-js';
Raven.config('http://fbb82c76f0954bb4b33c6838e85dff02@localhost:9000/9').install()


class App extends Component {
	constructor(props) {
		super(props);

		//configuration for web requests
		axios.defaults.timeout = 20000;

		this.state ={
			hasError: false,
		};
	}

	componentDidCatch(error, info) {
	  this.setState({hasError: true});
	  Raven.captureException(error, {extra: info}); //send error to raven client
	}



	render() {
		return (
							/*
                This is a list of different possible routes and what components should
                be rendered for each one
             */

			<div>
				 <Notifications />
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/about" component={About} />
					<Route exact path="/projects" component={ProjectsListContainer} />
					<Route exact path="/chapters" component={ChaptersContainer} />
					<Route exact path="/takes" component={ChunkListContainer} />
					<Route exact path="/user" component={User} />
					<Route path="*" component={NotFound} />
				</Switch>


			</div>
		);
	}
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(App);
