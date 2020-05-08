import React, { Component }     from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { bindActionCreators }   from 'redux'
import { withRouter }           from 'react-router-dom'
import * as audioActionCreators from 'core/actions/actions-audio'
import * as uiActionCreators    from 'core/actions/actions-ui'
import { StandardModal }        from 'components/Modals'
import AppBar                   from 'components/AppBar'
import BottomNavigation         from 'components/BottomNavigation'
import Slide                    from '@material-ui/core/Slide'
import Toolbar                  from '@material-ui/core/Toolbar'
import IconButton               from '@material-ui/core/IconButton'
import ArrowBackIcon            from '@material-ui/icons/ArrowBack'
import CloseIcon                from '@material-ui/icons/Close'
import Typography               from '@material-ui/core/Typography'
import MicrophoneIcon           from '@material-ui/icons/Mic'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import moment                   from 'moment'
import AudioVisualRecorder      from './components/AudioVisualRecorder'
import Controls                 from './components/Controls'
import Timer                    from './components/Timer'
import {
  sharedStyles,
  standardRecordView,
  iosRecordView
} from './styles.scss'

function TransitionComponent(props) {
  return <Slide direction="left" {...props} mountOnEnter unmountOnExit />
}

class RecordView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isIOS: !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
    }
  }

  componentDidMount() {
    const { actions } = this.props
    const { isIOS } = this.state

    if (!isIOS) {
      actions.ui.openModal({
        modalKey: 'record-modal'
      })
    }
  }

  getRecordView() {
    return (
      <div>
        <div className="record-view-container">
          <AudioVisualRecorder />
          <div className="bottom-section">
            <Timer />
            <div className="date">{this.showDateTime()}</div>
          </div>
        </div>
      </div>
    )
  }

  close= () => {
    const { actions, history } = this.props
    actions.audio.stopRecording()

    history.push('/')
  }

  displayHeaderMessage= () => {
    const { audio } = this.props
    const { microphoneAccessGranted } = audio
    const recordingCount = audio.count + 1

    if (microphoneAccessGranted) {
      return (
        <div className="message">
          <span>Recording </span>
          <strong>#{recordingCount + 1} Untitled.wav </strong>
          <em>...</em>
        </div>
      )
    }

    return (<span>New recording</span>)
  }

  showDateTime= () => {
    const { audio } = this.props
    const { microphoneAccessGranted } = audio

    if (microphoneAccessGranted) {
      const currentDateTime = moment().format('MMMM Do YYYY, h:mm a')
      return (currentDateTime)
    }

    return ('Press the microphone to record')
  }

  renderStandardRecordViewContainer() {
    const { ui, width } = this.props
    const closeIcon = isWidthUp('md', width) ? <CloseIcon /> : <ArrowBackIcon />

    return (
      <StandardModal
        modalKey="record-modal"
        modalState={ui.modalState}
        className="record-modal"
        cssModule={standardRecordView}
        onClose={this.close}
        TransitionComponent={TransitionComponent}
      >
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="back-arrow"
              onClick={this.close}
              className="arrow-icon"
            >
              {closeIcon}
            </IconButton>
            <Typography variant="title" color="inherit">
              {this.displayHeaderMessage()}
            </Typography>
            <MicrophoneIcon className="microphone-icon" />
          </Toolbar>
        </AppBar>
        <div className={sharedStyles}>
          <div className="standard-record-view">
            {this.getRecordView()}
            <BottomNavigation transparent>
              <Controls />
            </BottomNavigation>
          </div>
        </div>
      </StandardModal>
    )
  }

  renderIOSRecordViewContainer() {
    return (
      <div className={sharedStyles}>
        <div className={iosRecordView}>
          <div className="ios-record-view">
            {this.getRecordView()}
            <Controls />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { isIOS } = this.state

    return (
      <div>
        { !isIOS ? this.renderStandardRecordViewContainer() : this.renderIOSRecordViewContainer() }
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
      ui: bindActionCreators(uiActionCreators, dispatch),
      audio: bindActionCreators(audioActionCreators, dispatch)
    }
  }
}

RecordView.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  audio: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  ui: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
}

export default withWidth()(withRouter(connect(mapStateToProps, mapDispatchToProps)(RecordView)))
