import React, {Component} from 'react';
import TakeList from "./TakeList";
import ChunkPropTypes from "./ChunkPropTypes";

import {Accordion, Button, Icon, Container, Grid, Table} from "semantic-ui-react";
import Footer from './Footer'
import TakeTable from './TakeTable'
import PinkButton from "./comments/PinkButton";
let onClick;


class Chunk extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    render () {

        var publish = [];
        var onestar = [];
        var twostar = [];
        var threestar = [];


        /*
        rating, is_publish
         */
        this.props.segments.map((i) => {

            if (i.take.is_publish) {
                publish[publish.length] = i
            }

            else if(i.take.rating < 2) {
                onestar[onestar.length] = i
            }
            else if(i.take.rating === 2) {
                twostar[twostar.length] = i
            }
            else if(i.take.rating === 3) {
                   threestar[threestar.length] = i
            }

        })

        console.log('Publish', publish)
        console.log('One Stars', onestar)
        console.log('Two Stars', twostar)
        console.log('Three Stars', threestar)
        /*
        Segments is an array of takes for each chunk - good
         */

        var modeLabel = "";

        switch (this.props.mode) {
            case "chunk":
                modeLabel = "Chunk";
                break;
            case "verse":
                modeLabel = "Verse";
                break;
            default:
                modeLabel = "Segment";
        }

        var icon1 = <Icon name="star" color="red" size="big"/>
        var icon2 =
            <div>
                <Icon name="star" color="yellow" size="big"/>
                <Icon name="star" color="yellow" size="big"/>
            </div>
        var icon3 =
            <div>
                <Icon name="star" color="green" size="big"/>
                <Icon name="star" color="green" size="big"/>
                <Icon name="star" color="green" size="big"/>
            </div>
        var icon4 = <Icon name="check" color="pink" size="big"/>


        return (
            <div>
                <Accordion fluid styled>
                    <Accordion.Title className="ChunkTitle">
                        <center>
                            <Icon name='dropdown' />
                            <font color="black">
                            {modeLabel} {this.props.number}
                            </font>
                        </center>

                    </Accordion.Title>
                    <Accordion.Content className="ChunkBody">
                        <PinkButton
                            comments={this.props.comments}
                            onClickSave={this.props.onClickSave}
                            id={this.props.id}
                            type={"chunk"}
                            deleteComment={this.props.deleteComment}/>

                        <Grid fixed padded fluid columns={4}>
                            <TakeTable
                                icon={icon1}
                                takes={this.props.segments}
                                addToListenList={this.props.addToListenList}
                                patchTake={this.props.patchTake}
                                deleteTake={this.props.deleteTake}
                                updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                                onClickSave={this.props.onClickSave}
                                column={0}
                            />
                            <TakeTable
                                icon={icon2}
                                takes={this.props.segments}
                                addToListenList={this.props.addToListenList}
                                patchTake={this.props.patchTake}
                                deleteTake={this.props.deleteTake}
                                updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                                onClickSave={this.props.onClickSave}
                                column={1}
                            />
                            <TakeTable
                                icon={icon3}
                                takes={this.props.segments}
                                addToListenList={this.props.addToListenList}
                                patchTake={this.props.patchTake}
                                deleteTake={this.props.deleteTake}
                                updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                                onClickSave={this.props.onClickSave}
                                column={2}
                            />
                            <TakeTable
                                icon={icon4}
                                takes={this.props.segments}
                                addToListenList={this.props.addToListenList}
                                patchTake={this.props.patchTake}
                                deleteTake={this.props.deleteTake}
                                updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                                onClickSave={this.props.onClickSave}
                                column={3}
                            />
                        </Grid>
                    </Accordion.Content>
                </Accordion>
            </div>
        );
    }

}

/*
 Chunk.propTypes = {
 chunk: ChunkPropTypes
 };
 */

export default Chunk;