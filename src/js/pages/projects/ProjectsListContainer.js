import React, { Component } from "react";
import QueryString from "query-string";
import ProjectsList from "./components/ProjectsList";
import { connect } from "react-redux";
import "../../../css/projects.css";
import { Header } from "semantic-ui-react";
import axios from "axios";
import { isEqual } from "lodash";
import config from "config/config";
import ProjectFilter from "./ProjectFilter";
import NotFound from "js/pages/NotFound";
import ErrorButton from '../../../js/components/ErrorBytton';
import LoadingGif from '../../../js/components/LoadingGif';
import { bindActionCreators } from 'redux';
import { fetchAllProjects, dispatchAllProjectsReset } from '../../actions';

class ProjectsListContainer extends Component {


	componentDidMount() {
		/*
		get projects if query string is blank
		 */
		this.requestProjects(this.props.location.search);
	}

	requestProjects(queryString) {
		var query = QueryString.parse(queryString);
		this.props.fetchAllProjects(query, queryString);
	}

	//if the project query string has changed, request projects
	componentDidUpdate(prevProps, prevState) {
		if (!isEqual(prevProps.location, this.props.location)) {
			if (!this.props.location.search) {
				this.props.dispatchAllProjectsReset();
			} else if (this.props.location.search !== prevProps.location.search) {
				this.requestProjects(this.props.location.search);
			}
		}

	}

	setQuery(newQueryElement) {
		//merge together the current query with the new query element
		var currentQuery = QueryString.parse(this.props.currentProjectQuery);
		Object.assign(currentQuery, newQueryElement);

		//now turn the query into a query string and navigate to it
		var queryString = QueryString.stringify(currentQuery);
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: "?" + queryString
		});
	}

	clearQuery() {
		/*empty the current query and projects,
		and after the state has been set,
		 navigate to a URL without the query
		*/
		this.setState({ currentProjectQuery: "", projects: [] }, function () {
			this.props.history.push({
				pathname: this.props.location.pathname
			});
		});
	}

	navigateToProject(language, book, version) {
		//make the query for the right project, using our current query as a base
		var projectQuery = QueryString.parse(this.props.currentProjectQuery);
		Object.assign(projectQuery, {
			language: language,
			book: book,
			version: version
		});

		var queryString = QueryString.stringify(projectQuery);
		this.props.history.push({
			pathname: "/chapters",
			search: "?" + queryString
		});
	}

	render() {
		const { loaded, error, projects } = this.props;
		var retryRequestProjects = function () {
			this.requestProjects(this.props.location.search);
		};

		const chooseAprojectText = this.props.displayText.ChooseProj;

		//if a list of projects was loaded, but it was empty, there is some problem with the query URL
		const projectsLoadedButEmpty =
			loaded &&
			projects.length === 0 &&
			this.props.location.search;

		if (projectsLoadedButEmpty) {
			return <NotFound />;
		} else if (error) {
			return (<ErrorButton error={error} />);
		} else if (!loaded) {
			return (
				<LoadingGif />
			);
		} else {
			return (
				<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '2%' }}>
					<h1 style={{ fontSize: 35 }} >{chooseAprojectText}</h1>
					<ProjectFilter
						projects={projects}
						setQuery={this.setQuery.bind(this)}
						queryString={this.props.location.search}
						clearQuery={this.clearQuery.bind(this)}
						displayText={this.props.displayText}
						direction={this.props.direction}
					/>
					{this.props.projects.length > 0
						?
						<div style={{ marginTop: 10 }}>
							<ProjectsList
								projects={projects}
								navigateToProject={this.navigateToProject.bind(this)}
								displayText={this.props.displayText}
								direction={this.props.direction}
							/>
						</div>
						: ""}
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	const { direction } = state.direction;
	const { displayText } = state.geolocation;
	const { loaded, projects, error, currentProjectQuery } = state.projectsListContainer
	return { displayText, direction, loaded, projects, error, currentProjectQuery };
};
const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		fetchAllProjects, dispatchAllProjectsReset
	}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListContainer);
