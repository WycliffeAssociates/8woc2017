import React from 'react';

class Markers extends React.Component {


  getPosition(position) {
    //  console.log(position)
    this.props.dragPosition(position);            // change name to moveCursor

  }


  render() {
    let verseMarkers = this.props.text;
    const markerLength = verseMarkers.length;
    const position = this.props.translate;
    const {markerTime} = this.props;


    if (markerLength > 3) {
      verseMarkers = '';
    }

    return (
      <label onClick= {() => this.props.dragPosition(markerTime)}
        style={{position: 'absolute', marginLeft: `${position==0? position: position}%`, cursor: 'pointer', color: '#009CFF'}}
        width="20px"
        height="45px">
        <i className="fa fa-map-marker" />
      </label>


    );
  }
}







export default Markers;
