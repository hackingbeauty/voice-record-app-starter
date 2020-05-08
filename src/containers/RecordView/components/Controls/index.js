import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import * as audioActionCreators from 'core/actions/actions-audio'
import * as uiActionCreators    from 'core/actions/actions-ui'
import Button                   from 'components/Button'
import { ConfirmationModal }    from 'components/Modals'
import SaveIcon                 from '@material-ui/icons/Save'
import MicrophoneIcon           from '@material-ui/icons/Mic'
import PauseIcon                from '@material-ui/icons/Pause'
import DeleteIcon               from '@material-ui/icons/Delete'
import Slide                    from '@material-ui/core/Slide'
import { styles }               from './styles.scss'

class Controls extends Component {
  getPauseOrResumeControls = () => {
    const { audio } = this.props
    const { isRecording, isPaused } = audio

    if (isRecording && !isPaused) {
      return (
        <Button
          className="pause-or-record-btn"
          onClick={this.startOrPauseRecording}
          variant="contained"
        >
          <PauseIcon />
        </Button>
      )
    }

    return (
      <Button
        className="pause-or-record-btn"
        onClick={this.startOrPauseRecording}
        color="primary"
        variant="contained"
      >
        <MicrophoneIcon />
      </Button>
    )
  }

  startOrPauseRecording= () => {
    const { actions, audio } = this.props
    const { isPaused, isRecording } = audio

    if (isPaused) {
      actions.audio.resumeRecording()
    } else if (isRecording) {
      actions.audio.pauseRecording()
    } else {
      actions.audio.startRecording()
    }
  }

  stop = () => {
    const { actions } = this.props
    actions.audio.stopRecording()
  }

  confirmDelete = () => {
    const { actions } = this.props

    actions.ui.openConfirmModal({
      modalKey: 'confirm-delete-recording'
    })
  }

  save = () => {
    const { actions } = this.props
    actions.audio.stopRecording({ saveRecording: true })
  }

  renderControls =() => {
    const { audio } = this.props
    const { microphoneAccessGranted, saveRecording } = audio
    let controls

    if (microphoneAccessGranted === true) {
      controls = this.renderRecordingButtons()
    } else if (microphoneAccessGranted === false && saveRecording === true) {
      controls = this.renderRecordingButtons()
    } else {
      controls = this.renderMicrophoneButton()
    }

    return controls
  }

  renderMicrophoneButton() {
    return (
      <Button
        color="primary"
        variant="fab"
        className="microphone-btn"
        onClick={this.startOrPauseRecording}
      >
        <MicrophoneIcon />
      </Button>
    )
  }

  renderRecordingButtons = () => {
    const { audio, ui } = this.props
    const { isRecording } = audio

    return (
      <div>
        <Slide
          direction="right"
          in={isRecording}
          mountOnEnter
          unmountOnExit
        >
          <div className="is-recording-controls">
            <Button
              className="delete-btn"
              onClick={this.confirmDelete}
              variant="contained"
            >
              <DeleteIcon />
              Delete
            </Button>

            {this.getPauseOrResumeControls()}

            <Button
              className="save-btn"
              color="secondary"
              onClick={this.save}
              variant="contained"
            >
              <SaveIcon />
              Save
            </Button>
          </div>
        </Slide>

        <ConfirmationModal
          modalKey="confirm-delete-recording"
          confirmModalState={ui.confirmModalState}
          okCallback={this.stop}
          title="Delete this recording?"
        />

      </div>
    )
  }

  render() {
    const buttons = this.renderControls()

    return (
      <div className={styles}>
        {buttons}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    audio: state.audio,
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      audio: bindActionCreators(audioActionCreators, dispatch),
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  }
}

Controls.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  audio: PropTypes.shape({}).isRequired,
  ui: PropTypes.shape({}).isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
