import React, { Component } from 'react'
import { ReactMic }         from 'react-mic'
import FloatingActionButton from 'components/FloatingActionButton'
import AppBar               from 'components/AppBar'
import Toolbar              from '@material-ui/core/Toolbar'
import Typography           from '@material-ui/core/Typography'
import MicrophoneIcon       from '@material-ui/icons/Mic'
import StopIcon             from '@material-ui/icons/Stop'
import CloudDownloadIcon    from '@material-ui/icons/CloudDownload'
import { styles }           from './styles.scss'

class AudioVisualRecorder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      downloadLinkURL: null,
      blobURL: null,
      isRecording: false
    }
  }

  onSave=(blobObject) => {
    this.setState({ downloadLinkURL: blobObject.blobURL })
  }

  onStop= (blobObject) => {
    this.setState({ blobURL: blobObject.blobURL })
  }

  stopRecording= () => {
    this.setState({ isRecording: false })
  }

  startRecording= () => {
    this.setState({ isRecording: true })
  }

  stopRecording=() => {
    this.setState({ isRecording: false })
  }

  render() {
    const {
      blobURL,
      downloadLinkURL,
      isRecording
    } = this.state

    return (
      <div className={styles}>
        <div id="project-wrapper">
          <div id="project-container">
            <AppBar>
              <Toolbar>
                <Typography>Record Audio</Typography>
                <MicrophoneIcon className="microphone-icon" />
              </Toolbar>
            </AppBar>
            <div id="content">
              <ReactMic
                className="oscilloscope"
                record={isRecording}
                backgroundColor="#333333"
                visualSetting="sinewave"
                audioBitsPerSecond={128000}
                onStop={this.onStop}
                onSave={this.onSave}
                onData={this.onData}
                strokeColor="#0096ef"
              />
              <div id="oscilloscope-scrim">
                {!isRecording && <div id="scrim" />}
              </div>
              <div id="controls">
                <div className="column active">
                  <FloatingActionButton
                    color="primary"
                    disabled={isRecording}
                    onClick={this.startRecording}
                  >
                    <MicrophoneIcon />
                  </FloatingActionButton>
                </div>
                <div className="column">
                  <FloatingActionButton
                    onClick={this.stopRecording}
                    disabled={!isRecording}
                  >
                    <StopIcon />
                  </FloatingActionButton>
                </div>
                <div className="column download">
                  <a
                    href={downloadLinkURL}
                    download="recording.webm"
                  >
                    <CloudDownloadIcon />
                  </a>
                </div>
              </div>
            </div>
            <audio
              controls="controls"
              src={blobURL}
              controlsList="nodownload"
            >
              <track kind="captions" />
            </audio>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioVisualRecorder
