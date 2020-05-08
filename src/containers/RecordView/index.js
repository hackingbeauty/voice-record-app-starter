import React, { Component } from 'react'
import withWidth            from '@material-ui/core/withWidth'
import AudioVisualRecorder  from './components/AudioVisualRecorder'
import Controls             from './components/Controls'
import Timer                from './components/Timer'
import { styles }           from './styles.scss'

class RecordView extends Component {
  render() {
    return (
      <div className={styles}>
        <div className="record-view-container">
          <AudioVisualRecorder />
          <Controls />
          <Timer />
        </div>
      </div>
    )
  }
}

export default withWidth()(RecordView)
