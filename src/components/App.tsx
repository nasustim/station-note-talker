import React from 'react'
import styled from 'styled-components'

import { Button } from './Button'

import Audio from '../sound/audio'

const initialState = {
  isPlay: false,
  loopId: null,
  audio: null
}

export default class App extends React.Component<{}, typeof initialState> {
  constructor (props: React.Props<{}>) {
    super(props)
    this.state = initialState
    this._handler = this._handler.bind(this)
  }
  _handler (e) {
    e.preventDefault()
    if (!this.state.isPlay) {
      debugMsg('start')
      this.audio.playOneShot()
      const intervalId = setInterval(() => {
        this.audio.playOneShot()
      }, 5000)
      this.setState({
        loopId: intervalId
      })
    } else {
      debugMsg('stop')
      this.audio.stop()
      if(this.state.loopId != null) {
        clearInterval(this.state.loopId)
        this.setState({
          loopId: null
        })
      }
    }
    this.setState({
      isPlay: !this.state.isPlay
    })
  }
  componentDidMount () {
    this.audio = new Audio()
  }
  render () {
    return <Container>
      <StationName>五反田駅</StationName>
      <Button onClick={this._handler}>
        <p>{!!this.state.isPlay 
          ? '='
          : '▲'
        }</p>
      </Button>
    </Container>
  }
}

const StationName = styled.h1`
  color: black;
  font-size: 18pt;

  margin-bottom: 50px;
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  margin: 0;
  padding: 0;

  background-color: #EFEFEF;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const debugMsg = v => console.log(`[debug] ${v}`)