import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { withRouter }       from 'react-router-dom'
import { ReactMic }         from 'react-mic'
import { styles }           from './styles.scss'

class AudioVisualRecorder extends Component {

  onData = (recordedBlob) => {
    console.log('--- onData recordedBlob is ', recordedBlob)
  }

  create= (recording) => {

  }

  render() {
    const { audio } = this.props
    const { isRecording, isPaused } = audio

    return (
      <div className={styles}>
        <div className="audio-visual-container">
          <div className={isRecording ? 'is-recording' : 'not-recording'}>
            <ReactMic
              record={isRecording}
              pause={isPaused}
              className="visualization"
              backgroundColor={getStyles('darkGrey35')}
              strokeColor={getStyles('lightBlue')}
              onStop={this.create}
              onBlock={this.onBlock}
              onData={this.onData}
              visualSetting="sinewave"
              height={200}
            />
            <div className="visualization-scrim" />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    audio: state.audio
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      audio: bindActionCreators(audioActionCreators, dispatch)
    }
  }
}

AudioVisualRecorder.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  audio: PropTypes.shape({
    isRecording: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired
  }).isRequired,
  history: PropTypes.shape({}).isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AudioVisualRecorder))
