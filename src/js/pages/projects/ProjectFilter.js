import React, { Component } from "react";
import { Dropdown, Button, Message } from "semantic-ui-react";
import axios from "axios";
import config from "config/config";
import QueryString from "query-string";

class ProjectFilter extends Component {
	/*
     In the constructor, set the state to being empty so the component
     can render without errors before the API request finishes
     */
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			error: "",
			languages: [],
			books: [],
			versions: [],
			projects: []
		};
	}

	getFiltersFromProjects(projects) {
		//put the languages from projects into state
		this.setState({
			loaded: true,
			languages: projects.map(function(project) {
				return {
					key: project.language.slug,
					text: project.language.name,
					value: project.language.slug
				};
			}),

			books: projects.map(function(project) {
				return {
					key: project.book.slug,
					text: project.book.name,
					value: project.book.slug
				};
			}),

			versions: projects.map(function(project) {
				return {
					key: project.version,
					text: project.version,
					value: project.version
				};
			})
		});
	}

	requestAllFilters() {
	        var self = this;
	        self.setState({ error: "" });

	        axios
	            .all([
	                axios.get(config.apiUrl + "languages/",{
						headers: { Authorization: "Token " + localStorage.getItem('token') }
					}),
	                axios.get(config.apiUrl + "books/",{
						headers: { Authorization: "Token " + localStorage.getItem('token') }
					}),
	                axios.get(config.apiUrl + "versions/",{
						headers: { Authorization: "Token " + localStorage.getItem('token') }
					})
	            ])
	            .then(
	                axios.spread(function(
	                    languagesResponse,
	                    booksResponse,
	                    versionsResponse
	                ) {
	                    self.setState({
	                        loaded: true,
	                        languages: languagesResponse.data.map(function(language) {
	                            return {
	                                key: language.slug,
	                                text: language.name,
	                                value: language.slug
	                            };
	                        }),
	                        books: booksResponse.data.map(function(book) {
	                            return { key: book.slug, text: book.name, value: book.slug };
	                        }),
	                        versions: versionsResponse.data.map(function(version) {
	                            return { key: version.slug, text: version.slug, value: version.slug };
	                        })
	                    });
	                })
	            )
	            .catch(exception => {
	                self.setState({ error: exception });
	            });
	    }

	//called when page first loads
	componentWillMount() {
		if (this.props.queryString) {
			this.getFiltersFromProjects(this.props.projects);
		} else {
			this.requestAllFilters();
		}
	}

	//called when just the query string changes and new projects are loaded
	componentWillReceiveProps(nextProps) {
		this.setState({ loaded: false });
		if (nextProps.queryString) {
			this.getFiltersFromProjects(nextProps.projects);
		} else {
			this.requestAllFilters();
		}
	}

	setLanguage(event, dropdown) {
		if (dropdown.value) {
			this.props.setQuery({ lang: dropdown.value });
		}
	}

	setBook(event, dropdown) {
		if (dropdown.value) {
			this.props.setQuery({ book: dropdown.value });
		}
	}

	setVersion(event, dropdown) {
		if (dropdown.value) {
			this.props.setQuery({ version: dropdown.value });
		}
	}

	render() {
		var query = QueryString.parse(this.props.queryString);

		//if there are no options currently selected, put in a blank option
		var languageOptions = [];
		if (!query.language) {
			languageOptions = [{ key: "", text: "", value: "" }];
		}
		languageOptions = languageOptions.concat(this.state.languages);

		var bookOptions = [];
		if (!query.book) {
			bookOptions = [{ key: "", text: "", value: "" }];
		}
		bookOptions = bookOptions.concat(this.state.books);

		var versionOptions = [];
		if (!query.version) {
			versionOptions = [{ key: "", text: "", value: "" }];
		}
		versionOptions = versionOptions.concat(this.state.versions);

		return (
			<div style ={{ width: '100%', display:'flex', marginTop: '2%', justifyContent:'space-between', direction:`${this.props.direction}` }}>
				<div style ={{marginLeft: '20%', height:'auto'}}>
				<Dropdown
					placeholder={this.props.selectLanguage}  // text from in languages.json
					selection
					search
					loading={!this.state.loaded && !this.state.error}
					options={languageOptions}
					onChange={this.setLanguage.bind(this)}
					value={query.language}
				/>
				</div>
				<div style ={{ height:'auto',}}>
				<Dropdown
					placeholder={this.props.selectBook}
					selection
					search
					loading={!this.state.loaded && !this.state.error}
					options={bookOptions}
					onChange={this.setBook.bind(this)}
					value={query.book}
				/>
				</div>
				<div style ={{height:'auto'}}>
				<Dropdown
					placeholder={this.props.selectVersion}
					selection
					search
					loading={!this.state.loaded && !this.state.error}
					options={versionOptions}
					onChange={this.setVersion.bind(this)}
					value={query.version}
				/>
				</div>
				<div style ={{height:'auto', marginRight: '20%'}}>
				<Button onClick={this.props.clearQuery}>{this.props.clearButton}</Button>
			  </div>
				{this.state.error ? (
					<Message negative>
						{this.state.error.message}{" "}
						<Button onClick={this.requestAllFilters.bind(this)}>{this.props.retry}</Button>
					</Message>
				) : (
					""
				)}
			</div>
		);
	}
}

export default ProjectFilter;
