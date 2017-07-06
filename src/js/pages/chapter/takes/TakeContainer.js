import React, { Component } from 'react';
import TakePropTypes from "./TakePropTypes";
import Star from '../../../shared/Star';
import AudioComponent from './AudioComponent'

class TakeContainer extends Component {
    onRatingSet (newRating) {
        console.log("new rating for take " + this.props.take.id + ": " + newRating);
        //would do an AJAX request here to update rating on this take using its id...
    }

    //other functions here for dealing with new audio comments recorded, etc

    render () {



        return (


            /*
             <div className="take">
             <br />
             <strong>Take by <font color="blue">{this.props.take.author}</font> on {this.props.take.timestamp}</strong>
             <Star rating={this.props.take.rating} onChange={this.onRatingSet.bind(this)}/>
             <AudioComponent src={this.props.take.audioSource} />
             <br />
             <br />
             </div>
             */
            <div>
                <h6>
                    {this.props.take.location}
                </h6>
                <div>
                    <AudioComponent
                        src={this.props.take.location}
                    />
                </div>
            </div>
        );
    }
}

TakeContainer.propTypes = {
    take: TakePropTypes
};

export default TakeContainer;