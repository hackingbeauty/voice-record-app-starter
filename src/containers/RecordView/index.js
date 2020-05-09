import React, { Component } from 'react'
import withWidth            from '@material-ui/core/withWidth'
import AudioVisualRecorder  from './components/AudioVisualRecorder'
import { styles }           from './styles.scss'

class RecordView extends Component {
  render() {
    return (
      <div className={styles}>
        <div className="record-view-container">
          <AudioVisualRecorder />
        </div>
      </div>
    )
  }
}

export default withWidth()(RecordView)
