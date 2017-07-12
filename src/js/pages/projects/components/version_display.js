import React, { Component } from 'react';
import {Dropdown} from "semantic-ui-react";
import {languageOptions} from "./common";


class Version extends Component {
    /*
     In the constructor, set the state to being empty so the component
     can render without errors before the API request finishes
     */
    constructor(props) {
        super(props);
        this.state = {projects:[]};
    }

    /*
     In componentDidMount, do the API request for the data and then use
     setState to put the data in state
     */

    // componentDidMount() {
    //     axios.get('http://172.19.145.91:8000/api/languages/').then(results => {
    //         this.setState({
    //             projects: results.data
    //         })
    //
    //     })
    // }


    /*
     In render, just render a child presentation component, passing it
     the data as props
     */
    render () {
        return (
            <div>
                <Dropdown text='Select Version'
                          search
                          floating
                          labeled
                          button
                          className='icon'
                          icon='write'
                          options={languageOptions}
                />
            </div>
        );
    }
}

export default Version;