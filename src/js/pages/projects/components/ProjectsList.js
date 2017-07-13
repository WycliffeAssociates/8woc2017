/*
    Here's an example presentation component that just handles outputting data. It
    doesn't care where you got the data from - it just displays it.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {Table} from 'semantic-ui-react'
import CircularProgressbar from 'react-circular-progressbar'
import '../../../../css/projects.css'

import {ReadMore} from 'react-read-more';

class ProjectsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToProject: null,

        };

    }
    /*
        Render data in props, passed to this component by its parent container component
     */
    render () {
        return (
            <Table.Body>
                {this.state.redirectToProject
                    ? <Redirect push to={{pathname: '/projects/' + this.state.redirectToProject}}/>
                    : this.props.projects.map(this.createListItem.bind(this))
                }
            </Table.Body>
        );
    }


    /*
        Here's an example of how to create a link using React Router
     */
    /*{project.percentFinished}*/
    createListItem (project) {
        return (


        <Table.Row >
            <Table.Cell onClick={() => this.setState({redirectToProject: project.id})}>{project.language}</Table.Cell>
            <Table.Cell onClick={() => this.setState({redirectToProject: project.id})}>{project.book}</Table.Cell>
            <Table.Cell onClick={() => this.setState({redirectToProject: project.id})}><CircularProgressbar strokeWidth="20" percentage={project.percentFinished} /></Table.Cell>
            <Table.Cell><ReadMore lines={1} onShowMore={this.props.onChange} text="more">
                             <b>Date Modified</b>: {project.dateModified} <br/>
                             <b>Translation Type</b>: {project.translationType} <br/>
                             <b>Contributors</b>: {project.contributors} <br/>
                         </ReadMore></Table.Cell>

        </Table.Row>

        );
    }
}
/*
    Use PropTypes to define what props this component expects. If it's passed the wrong props,
    you'll get warnings while you're in development mode
 */
ProjectsList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        book: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        translationType: PropTypes.string.isRequired,
        percentFinished: PropTypes.number.isRequired,
        contributors: PropTypes.arrayOf(PropTypes.string).isRequired,
        dateModified: PropTypes.string.isRequired
    })).isRequired
};

export default ProjectsList;