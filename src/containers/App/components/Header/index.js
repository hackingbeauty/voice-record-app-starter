import React, { Component } from 'react'
import AppBar               from 'components/AppBar'
import Avatar               from 'components/Avatar'
import Toolbar              from '@material-ui/core/Toolbar'
import Typography           from '@material-ui/core/Typography'
import { styles }           from './styles.scss'

class Header extends Component {
  render() {
    return (
      <div className={styles}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">
              <span>React-Mic Demo App</span>
            </Typography>
            <Avatar className="avatar" />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default Header
