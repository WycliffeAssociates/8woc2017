import React, {Component} from 'react';
import MarkAsDone from "./MarkAsDone";
import CommentContainer from "./comments/PinkButton"
import {Menu, Container, Card, Button, Icon, Label, Popup, Grid, Divider} from 'semantic-ui-react'
import AudioComponent from "./AudioComponent"
import config from 'config/config'
import 'css/takes.css'
import TakeListenButton from './AddTake'
class Footer extends Component {

    createArray() {

        if (this.props.listenList.length > 0) {
            var takeList = [];
            this.props.listenList.map((i) => {
                takeList[takeList.length] = i.mode + ' ' + i.chunk.startv + ' take ' + i.count
            })
            return takeList
        }
        else {
            return []
        }
    }



    createListenPlaylist() {


        if (this.props.listenList.length > 0) {
            var playlist = [];
            this.props.listenList.map((i) => {
                playlist[playlist.length] = {
                    "src": config.streamingUrl + i.props.take.location,
                    "name": this.props.mode + ' ' + i.chunk.startv + ' take ' + i.count
                }
            })

            this.props.playPlaylist(playlist)

            /*
            return (


                <Card fluid>
                    <AudioComponent playlist={playlist} width={700}/>
                </Card>


            );
            */
        }

        else {
            return null;
        }

    }



    render () {

        var take = [{
            "src": "a",
            "name": "nathan"
        }]

        var icon = <Icon name="plus" size="big" color="blue"/>
        var button = <Button icon={icon} basic/>

        return (

            <div className="footerStyle" style={{width:'100%'}}>
                <Menu inverted secondary>
                    {this.props.currentPlaylist.length > 0
                        ? <Menu.Item style={{width:'100%'}}>
                            <div style={{width:'100%'}}>
                                <AudioComponent
                                    playlist={this.props.currentPlaylist}
                                    width={500}
                                    loop={this.props.audioLoop}
                                    markers={this.props.markers}
                                    showMarkers={true}
                                />
                            </div>
                          </Menu.Item>
                        : ""
                    }


                    {/*
                    <Menu.Item>
                        {this.createListenPlaylist()}
                    </Menu.Item>
                    */}

                    {this.createArray().length > 0
                        ? <Menu.Item position="right">
                            <Label pointing="right" size="huge" basic color="black">Stitched takes</Label>

                            <Popup inverted trigger={button} hoverable size="large">
                                <Grid inverted divided>
                                    <Grid.Column divided>
                                        <Grid.Row verticalAlign="middle">
                                            <TakeListenButton onClick={this.createListenPlaylist.bind(this)} /> Play All
                                            {/*this.createListenPlaylist()*/}
                                        </Grid.Row>

                                        {this.createArray().map((i) => {
                                            return(
                                                <div>
                                                    <Divider />

                                                <Grid.Row>{i} </Grid.Row>
                                                </div>

                                            );
                                        })}
                                    </Grid.Column>

                                </Grid>


                            </Popup>


                        </Menu.Item>
                        : ""
                    }
                </Menu>
            </div>
        );
    }
}

export default Footer;
