import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {Button, Col, FormGroup, Input, Jumbotron, Label} from "reactstrap";
import List from './List'
import axios from 'axios'

class ProjectsListContainer extends Component {
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
    componentDidMount() {
        axios.get('http://172.19.145.91:8000/api/languages/').then(results => {
            this.setState({
                projects: results.data
            })

        })
    }


        //I would do a web request here...
        //Just going to put fake data in state instead

    render () {
        return (
            <div>
                <Jumbotron style={{  margin: '10%', marginTop:'7%', padding: '3px', fontSize: '15px', backgroundColor:'#D4D4D4', borderRadius: '25px'}}>
                    <h1 style={{textAlign: 'center', fontSize: '23px', color:'white', fontWeight:'bold'}} className="display-3">select language</h1>

                    <Jumbotron fluid style={{backgroundColor: 'white', padding: '15px', paddingBottom:'30px'}}>
                        <FormGroup>
                            <h1 style={{textAlign: 'center', fontSize: '23px'}} className="display-3">select the following</h1>

                            <FormGroup>

                                <Input type="search" name="search" id="exampleSearch" placeholder="search" />
                            </FormGroup>
                            <Label for="exampleSearch">Choose Target Language</Label>

                            <Input type="select" name="selectMulti" id="exampleSelectMulti" style = {{height: '300px', fontSize: '30px' }} multiple>
                                {this.state.projects.map((project) => <option>{project.name}</option>)}
                                </Input>

                        </FormGroup>
                    </Jumbotron>
                </Jumbotron>
            </div>
        );
    }

}







export default ProjectsListContainer;