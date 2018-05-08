import React from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';
import {getEmptyImage} from 'react-dnd-html5-backend';
import Waveform from '../../components/audioplayer/Waveform';
import Marker from '../../components/audioplayer/Markers';
import config from 'config/config';
import BottomButtons from './BottomButtons';
import jdenticon from 'jdenticon';
import propTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'css/notification.css';



export class TakeCard extends React.Component {

  constructor(props) {
    super(props);

    this.state= {
      takePlaying: false,
      showMarkersColor: '',
      hash: 'randomhash4324',
      pos: 0,
      width: 0,
      height: 0,

    };

    this.callMarker  = this.callMarker.bind(this);
    this.playTakeFromCard = this.playTakeFromCard.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
    this.dragPosition = this.dragPosition.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);



  }


  componentDidMount() {
    jdenticon.update('#user',this.props.loggedInUser? this.props.loggedInUser: 'no author info');
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }



  dragPosition(position) {
    this.setState({pos: position, takePlaying: true});
  }

  trackPos(pos) {
    this.setState({pos: pos});
  }
  finishedPlaying() {
    this.setState({takePlaying: false,
      pos: 0});

  }

  playTakeFromCard() {
    this.setState(prevState => ({takePlaying: !prevState.takePlaying}));
  }


  callMarker() {
    const markerArray = [];

    let receivedMarkersString = this.props.markers;

    let receivedMarkerObject = JSON.parse(receivedMarkersString);

    for (const key in receivedMarkerObject) {
      const position = (receivedMarkerObject[key] / 44100);
      const finalPosition = (position/this.props.duration)*100;
      // calculate the position of the marker
      // by dividing the marker position from the props, by the duration of the take
      // * by 100 and use that percatage to place the marker on the card in correct place
      // offset by 4 to account for the padding inside the taskList. If remove 4, marker moves all the way to the left
      //of the container, beyond the take card.
      markerArray.push(
        <Marker
          style={{ overflow: 'visible'}}
          visibility={true}
          translate={finalPosition}
          markerTime = {position}
          text={key}
          key = {key}
          dragPosition={this.dragPosition}
        />);
    }

    return (
      markerArray
    );
  }

  render() {
    let markers ='';
    const {pos} = this.state;
    markers = this.callMarker();

    const {connectDragSource , isDragging} = this.props;


    return  connectDragSource( //only native element nodes can now be passed to React DnD connectors
      <div style={{opacity: isDragging? 0.5: 1}} >
        <TopBar {...this.props} />

        <MarkerContainer>
          {markers}
        </MarkerContainer>

        <WaveformContainer>
          <Waveform
            audioFile={config.streamingUrl+this.props.location}
            playing = {this.state.takePlaying} durationTime={this.props.duration}
            trackPos = {this.trackPos}
            pos = {pos}
            finishedPlaying={this.finishedPlaying}
            options= {{ cursorWidth: 2, progressColor: '#009CFF', cursorColor: '#E74C3C', barWidth: 1, hideScrollbar: true, normalize: true, height: 35, waveColor: '#969595' }}
          />
        </WaveformContainer>

        <BottomButtons {...this.props} width={this.state.width} takePlaying= {this.state.takePlaying} playTakeFromCard = {() => this.playTakeFromCard()} expandComments={() => this.props.expandComments()} />



      </div>
    );
  }

}

const MarkerContainer= styled.div`
margin-bottom: 2vh;
position:relative;
`;

const WaveformContainer = styled.div`
  height:3vw;
  margin-bottom: 0.5vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
`;


let undo= false;

const UndoToast = ({closeToast, props}) => {

  function handleClick() {
    undo = true;
    closeToast();
  }

  return (
    <div style={{textAlign: 'center', color: 'white'}}>
      <p>{props.txt.deletingTake} </p>
      <Undo onClick={handleClick}> {props.txt.undo}<i className="material-icons">undo</i> </Undo>
    </div>
  );

};

function showUndoToast(props) {
  toast(<UndoToast props={props} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    closeOnClick: true,
    className: 'black-background',
    onClose: () => {
      if (undo === true) {
        //do not delete the take
      }
      else if (undo === false) {
        props.deleteTake(props.id, props.activeChunkId, props.chunkNum);
      }
    },

  });
}

const ConfirmDelete = ({closeToast,props }) => (
  <div style= {{textAlign: 'center'}}>
    <p> {props.txt.deleteTake} </p>
    <ButtonContainer>
      <Confirm onClick={() => (showUndoToast(props), closeToast())}>
        {props.txt.confirm} <i className="material-icons">done_all</i>
      </Confirm>
      <Undo onClick={closeToast}> {props.txt.undo}<i className="material-icons">undo</i> </Undo>
    </ButtonContainer>
  </div>
);

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Confirm = styled.button`
  min-height: 40px;
  min-width: 90px;
  background: linear-gradient(to top, #820C00, #E74C3C);
  border-radius: 20px;
  border: none;
  color: white;
  cursor: pointer;
  text-decoration: underline;
  i {
    vertical-align: middle;
    text-decoration: none;
  }

`;

const Undo = styled.button`
  min-height: 40px;
  min-width: 90px;
  background: linear-gradient(to top, #0076FF, #00C5FF);
  border-radius: 20px;
  border: none;
  color: white;
  cursor: pointer;
  text-decoration: underline;
  i {
    vertical-align: middle;
    text-decoration: none;
  }
`;

TakeCard.propTypes = {
  count: propTypes.number.isRequired,
  take: propTypes.object.isRequired,
  author: propTypes.string.isRequired,
  onRatingSet: propTypes.func.isRequired,
  onMarkedForExportToggled: propTypes.func.isRequired,
  takeId: propTypes.number.isRequired,
  connectDragPreview: propTypes.func.isRequired,
};

const takeSource = {
  beginDrag(props, monitor, component) {

    return { index: props.id, rating: props.rating, take: props, active: props.active, publishedTake: props.publishedTake };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult && dropResult.listId !== item.rating) //CHECK DROP DESTINATION VS CARD ORIGIN
    {

      if (dropResult.listId === 4) //CHECK PUBLISHED COLUMN
      {
        if (item.take.published === false && props.publishedTake == true) {
          toast.error(props.txt.alreadyPublished,
            {
              position: toast.POSITION.TOP_CENTER,
            });

        }

        else // MOVE TAKE TO EMPTY PUBLISHED COLUMN{
          props.makeChanges(
            item.take.published,
            dropResult.listId,
            item.take
          );
      }


      else if (dropResult.listId === 'DELETE_TAKE') //CHECK DELETE TARGET
      {
        toast(<ConfirmDelete props={props} />, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: 'black-background',
          autoClose: 10000,
          closeOnClick: false,
        });
      }
      else // DEFAULT MOVE TAKE
      {
        props.makeChanges(
          item.take.published,
          dropResult.listId,
          item.take
        );
      }
    }

    else if (dropResult && dropResult.listId === 3 && item.rating === 3) {

      props.makeChanges(
        item.take.published,
        dropResult.listId,
        item.take
      );
    }
  },

};


export default
DragSource('TakeCard', takeSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview(),
}))(TakeCard);
