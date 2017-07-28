import React, { Component } from 'react';
import {Button, Container, Header, Table, Input, TextArea, Loader } from "semantic-ui-react";
import ChapterList from "./components/ChapterList";
import DownloadProjects from "./components/DownloadProjects";
import axios from 'axios';
import config from 'config/config'
import QueryString from 'query-string';
import LoadingDisplay from "js/components/LoadingDisplay";
import LoadingGif from 'images/loading-tiny.gif'
import 'css/chapters.css'
import PublishButton from "./components/PublishButton";


class ProjectContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            chapters: [],
            book: {},
            language: {},
            project_id: -1,
            is_publish: false,
            filesData: null,
            loaded: false,
            error: "",
            publishError: "",
            downloadError: "",
            downloadSuccess: "",
            uploadSourceLoading: false,
            uploadSourceError: "",
            uploadSourceSuccess: "",
            anthology: {},
            downloadLoading: false,
            version: {}
        };
    }

    publishFiles() {
        let chapterID = this.state.project_id
        let parameters = {
            "is_publish": true
        }

        axios.patch(config.apiUrl + 'projects/' + chapterID +"/", parameters)
            .then((response) => {
                this.setState({is_publish: true})
            }).catch((exception) => {
            // TODO: modify for the error that occurs if the patch fails
            this.setState({publishError: exception});
        });
}

    setCheckingLevel(level){

        let params = {
            filter: {
                language: this.state.language.slug,
                book: this.state.book.slug,
                chapter: this.state.chapters.name,
                anthology: this.state.anthology.name,
                version: QueryString.parse(this.props.location.search).version
            },
            fields: {
                checked_level: level
            }
        };

        alert("This needs to get fixed - it crashes");
        // TODO: Endpoint had been renamed to projects/
        // axios.post(config.apiUrl + "update_project/", params);
    }

    getChapterData() {
        var query = QueryString.parse(this.props.location.search);

        this.setState({error: ""});
        axios.post(config.apiUrl + 'get_chapters/', query
        ).then((results) => {
            this.setState(
                {
                    chapters: results.data.chapters,
                    book: results.data.book,
                    project_id: results.data.project_id,
                    is_publish: results.data.is_publish,
                    language: results.data.language,
                    loaded: true,
                    version: results.data.version
                }
            )
        }).catch((exception) => {
           this.setState({error: exception});
        });
    }

    navigateToChapter(chNum) {
        var query = QueryString.parse(this.props.location.search);
        query.chapter = chNum;
        this.props.history.push(
            {
                pathname: "/takes",
                search: QueryString.stringify(query)
            }
        )
    }

    // Minimal parameters saves on server query time
    onDownloadProject() {
        this.setState({downloadLoading: true, downloadError: "", downloadSuccess: ""});

        let params = {
            project: this.state.project_id
        }

        //check if changes have been made
        // if (changesHaveBeenMade) {
        //      // Re-convert file to zip
        // }
        // else {
        //      // immediately download the file
        // }

        axios.post(config.apiUrl + "zip_files/", params, {timeout: 0})
            .then((download_results) => {

                window.open(config.streamingUrl + download_results.data.location);
                this.setState({downloadLoading: false, downloadSuccess: "Success. Check your downloads folder"});

            }).catch((exception) => {
                this.setState({downloadError: exception});
            }).catch((error) => {
                this.setState({downloadLoading: false, downloadError: error});
        });
    }

    componentDidMount() {
        this.getChapterData()
    }

    render () {

        return (
            <div className="chapters">
                <Container fluid>

                    <LoadingDisplay loaded={this.state.loaded}
                                    error={this.state.error}
                                    retry={this.getChapterData.bind(this)}>

                        <Header as='h1' >{this.state.book.name} ({this.state.language.name})


                            <PublishButton
                            chapters={this.state.chapters}
                            isPublish={this.state.is_publish}
                            onPublish={this.publishFiles.bind(this)}
                        />
                        </Header>


                        <Table selectable fixed color="grey">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Chapter</Table.HeaderCell>
                                    <Table.HeaderCell>Percent Complete</Table.HeaderCell>
                                    <Table.HeaderCell>Checking Level</Table.HeaderCell>
                                    <Table.HeaderCell>Ready to Publish</Table.HeaderCell>
                                    <Table.HeaderCell>Contributors</Table.HeaderCell>
                                    <Table.HeaderCell>Translation Type</Table.HeaderCell>
                                    <Table.HeaderCell>Date Modified</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <ChapterList
                                chapters={this.state.chapters}
                                version={QueryString.parse(this.props.location.search).version}
                                navigateToChapter={this.navigateToChapter.bind(this)}
                                setCheckingLevel={this.setCheckingLevel.bind(this)}
                            />
                        </Table>

                    </LoadingDisplay>

                    <br></br>


                    <DownloadProjects
                        onDownloadProject={this.onDownloadProject.bind(this)}
                    />

                    {this.state.downloadLoading
                        ? <img src={LoadingGif} alt="Loading..." width="16" height="16"/>
                        : ""
                    }
                    {this.state.downloadError
                        ? "There was an error. Please try again"
                        : ""
                    }

                    {!this.state.uploadSourceLoading && this.state.uploadSourceSuccess
                        ? <div>Successfully uploaded {this.state.uploadSourceSuccess} and set it as source audio</div>
                        : <form onSubmit={this.uploadSourceFile} method="post" encType="multipart/form-data">
                            <h4>Upload source audio</h4>
                            <Input type="file" name="fileUpload" className="form-control" onChange={this.handleFileChange}/>
                            {this.state.uploadSourceLoading
                                ? <img src={LoadingGif} alt="Loading..." width="16" height="16"/>
                                : <Button type="submit">Submit</Button>
                            }
                            {this.state.uploadSourceError
                                ? "There was an error uploading the file: " + this.state.uploadSourceError
                                : ""
                            }
                        </form>
                    }

                </Container>

            </div>

        );
    }
}

export default ProjectContainer;