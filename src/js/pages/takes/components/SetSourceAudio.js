import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import config from 'config/config';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchAllSourceAudio } from "../../../actions";

class SetSourceAudio extends Component {
    componentDidMount() {
        this.props.fetchAllSourceAudio(this.props.book, this.props.projectId);
    }

    setSource(project) {
        this.props.setSourceProject(project);
    }

    render() {
        console.log("props", this.props);
        return (
            <Dropdown
                search
                selection
                floated="right"
                labeled
                className="icon"
                icon="assistive listening systems"
                loading={!this.props.loaded}
                options={this.props.projects}
                onChange={(event, dropdown) => { this.setSource(dropdown.value)}}
            />
        );
    }
}
const mapStateToProps = state => {
    const { loaded, error, projects } = state.sourceAudio;
    return {
        loaded, error, projects
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        fetchAllSourceAudio
    }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(SetSourceAudio);