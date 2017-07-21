import React, { Component } from 'react';
import PropTypes from "prop-types";
import TakeContainer from "../TakeContainer";
import TakePropTypes from "./TakePropTypes";

var iterator;
class TakeList extends Component {
    render () {

        iterator = 0;
        return (
            <div>
                {this.props.takes.map(this.createListItem.bind(this))}
            </div>

        );
    }

    createListItem (take) {
        iterator += 1;

        return (
            <div>
                <TakeContainer
                    take={take} // one take
                    count={iterator}
                    source={take.source}
                    addToListenList={this.props.addToListenList}
                    patchTake={this.props.patchTake}
                    deleteTake={this.props.deleteTake}
                    updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                />
            </div>
        );
    }
}

TakeList.propTypes = {
    takes: PropTypes.arrayOf(TakePropTypes).isRequired
};

export default TakeList;