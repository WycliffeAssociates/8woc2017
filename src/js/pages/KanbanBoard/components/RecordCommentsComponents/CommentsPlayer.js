import React, { Component } from 'react';
import styled from 'styled-components';
import PlayerTracker from '../../../../components/PlayerTracker';

class CommentsPlayer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      play: false,
      pos: 0,
    };

    this.handlePosChange = this.handlePosChange.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.duration = this.duration.bind(this);
  }

  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0],
    });
  }

  duration(e) {

    if (this.props.pointer > 0) {
      this.setState({ play: true });
    }
  }

  toggleButton() {
    this.setState({ play: !this.state.play });
  }

  finishedPlaying() {

    this.setState({ pos: 0, play: false });
    if (this.props.loop) {
      this.props.playNext(true);

    }

  }

  render() {
    let position = this.state.pos;

    let playPauseBtn = <PlayButton />;

    if (this.state.play) {
      playPauseBtn = <PauseButton />;
    }
    return (
      <Container >
        <PlayerTracker audioFile={this.props.audioFile} />
        {/* <BlockMiddle></BlockMiddle> */}
      </Container>

    );
  }
}

const PlayButton = ({ onClick }) => (
  <svg width="30px" height="36px" viewBox="60 21 15 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="PlayBtn-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(60.000000, 22.000000)" cursor="pointer" >
      <path d="M13.6891593,7.74261351 C14.1009891,7.98522993 14.1062298,8.37550147 13.6891593,8.62120529 L0.745683654,16.2464437 C0.333853944,16.4890602 1.60258951e-15,16.3460052 1.60258951e-15,15.9107611 L0,0.453057719 C0,0.0250488936 0.328613225,-0.128328748 0.745683654,0.117375075" id="Triangle" fill="#fff" />
    </g>
  </svg>
);

const PauseButton = ({ onClick }) => (
  <svg width="30px" height="32px" viewBox="60 22 15 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="PauseBtn-2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(60.000000, 22.000000)" cursor="pointer" >
      <path d="M0,0.991339547 C0,0.443837833 0.447459618,0 1.00111708,0 L3.66554959,0 C4.21845128,0 4.66666667,0.457197498 4.66666667,0.991339547 L4.66666667,14.8562795 C4.66666667,15.4037812 4.21920705,15.847619 3.66554959,15.847619 L1.00111708,15.847619 C0.448215384,15.847619 0,15.3904215 0,14.8562795 L0,0.991339547 Z" id="Rectangle-Left" fill="#FFF" />
      <path d="M9.33333333,0.991339547 C9.33333333,0.443837833 9.78079295,0 10.3344504,0 L12.9988829,0 C13.5517846,0 14,0.457197498 14,0.991339547 L14,14.8562795 C14,15.4037812 13.5525404,15.847619 12.9988829,15.847619 L10.3344504,15.847619 C9.78154872,15.847619 9.33333333,15.3904215 9.33333333,14.8562795 L9.33333333,0.991339547 Z" id="Rectangle-Right" fill="#FFF" />
    </g>
  </svg>
);

const Container = styled.div`
  padding-right: 1vw;
  width: 8vw;
  display:flex;
  justify-content: space-around;
`;

const BlockMiddle = styled.div`
  position: absolute;
  background-color: #fff;
  height: 1vw;
  width: 5vw;
  z-index: 3;
  top: 40%;
  left: 91%;
  //transform: translate(-50%, -50%);
`;

const ButtonContainer = styled.div`
  align-self: center;
  height: 2vw;
  width: 1vw;
  display: flex;
  justify-content: center;

`;

const WaveformContainer = styled.div`
  width: 70%;
  padding-left: : 1vw;
  padding-top: .5vw;
`;

export default CommentsPlayer;
