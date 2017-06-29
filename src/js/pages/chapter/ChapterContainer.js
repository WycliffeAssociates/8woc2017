import React, {Component} from 'react';
import ChunkList from "./ChunkList";

class ChapterContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {segments: [], mode: ""};
    }

    componentDidMount () {
        var chapterID = this.props.match.params.chid;
        //do a web request here for segments (chunks or verses) of chapter...
        //this is just fake data for now
        this.setState(
            {
                segments: [
                    {
                        mode: "chunk",
                        number: 1,
                        takes: [
                            {
                                id: 1,
                                audioSource: "audiosource",
                                author: "Bob the Translator",
                                rating: 3,
                                timestamp: "timestamp"
                            },
                            {
                                id: 2,
                                audioSource: "audiosource",
                                author: "Alice the Translator",
                                rating: 2,
                                timestamp: "timestamp"
                            },
                            {
                                id: 5,
                                audioSource: "audiosource",
                                author: "Bob the Translator",
                                rating: 3,
                                timestamp: "timestamp"
                            }
                        ]
                    },
                    {
                        mode: "chunk",
                        number: 3,
                        takes: [
                            {
                                id: 8,
                                audioSource: "audiosource",
                                author: "Bob the Translator",
                                rating: 1,
                                timestamp: "timestamp"
                            },
                            {
                                id: 10,
                                audioSource: "audiosource",
                                author: "Alice the Translator",
                                rating: 3,
                                timestamp: "timestamp"
                            }
                        ]
                    }
                ]
            }
        );
    }

    render () {
        return (
            <div>
                I'm a chapter container for {this.props.match.params.chid}!
                <ChunkList
                    segments={this.state.segments}
                    mode={this.state.mode}
                />
            </div>
        );
    }
}

export default ChapterContainer;