import React from 'react';
import styled from 'styled-components';

import { Button } from './Button';

import Audio from '../sound/audio';

const initialState = {
  isPlay: false,
  loopId: null,
  audio: null,
};

export default class App extends React.Component<{}, typeof initialState> {
  constructor(props: React.Props<{}>) {
    super(props);
    this.state = initialState;
    this._handler = this._handler.bind(this);
  }

  _handler(e) {
    e.preventDefault();
    if (!this.state.isPlay) {
      debugMsg('start');
      this.audio.playOneShot();
      const intervalId = setInterval(() => {
        this.audio.playOneShot();
      }, 5000);
      this.setState({
        loopId: intervalId,
      });
    } else {
      debugMsg('stop');
      this.audio.stop();
      if (this.state.loopId != null) {
        clearInterval(this.state.loopId);
        this.setState({
          loopId: null,
        });
      }
    }
    this.setState({
      isPlay: !this.state.isPlay,
    });
  }

  componentDidMount() {
    this.audio = new Audio();
  }

  render() {
    return (
      <Container>
        <BackgroundContainer>
          <StationName>五反田駅</StationName>
        </BackgroundContainer>
        <PartnerContainer>
          <div></div>
        </PartnerContainer>
        <ButtonContainer>
          <Button onClick={this._handler}>
            <p>
              {this.state.isPlay
                ? '='
                : '▲'}
            </p>
          </Button>
        </ButtonContainer>
      </Container>
    );
  }
}

const StationName = styled.h1`
  color: black;
  font-size: 18pt;

  margin: 50px auto 50px;

  border: solid 0.5px #000;
  padding: 20px 50px 30px;

  background-color: white;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
`;

const ButtonContainer = styled.div`
  position: fixed;
  z-index: 10;

  right: 0;
  bottom: -10px;
`

const PartnerContainer = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
  height: 100%;

  div {
    position: absolute;

    right: 0px;
    bottom: -20px;

    height: calc(240px * 1.5);
    width: calc(110px * 1.5);
    transform: rotate(-12deg);

    border-radius: 50%;
    border: solid 1px #1e1e1e;

    background-color: #cecece;
  }
  pointer-events: none;
`

const BackgroundContainer = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: start;

  overflow-y: scroll;

  background-color: #fcfcfc;
`

const debugMsg = (v) => console.log(`[debug] ${v}`);
