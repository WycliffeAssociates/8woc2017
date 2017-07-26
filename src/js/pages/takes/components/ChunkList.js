import React, {Component} from 'react';
import PropTypes from "prop-types";
import Chunk from "./Chunk";
import ChunkPropTypes from "./ChunkPropTypes";

class ChunkList extends Component {

    render() {

        return (
            <div>

                {
                    <Chunk
                        comments={this.props.comments}
                        segments={this.props.segments} // array of takes
                        mode={this.props.mode}
                        number={this.props.number}
                        addToListenList={this.props.addToListenList}
                        patchTake={this.props.patchTake}
                        deleteTake={this.props.deleteTake}
                        updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                        onClickSave={this.props.onClickSave}
                        id={this.props.id}
                        deleteComment={this.props.deleteComment}
                    />
                }

            </div>
        );
    }

}
/*
 ChunkList.propTypes = {
 segments: PropTypes.arrayOf(ChunkPropTypes)
 };
 */

export default ChunkList;